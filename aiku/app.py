"""
A simple flask app which has an endpoint that takes two inputs for themes
and uses GPT-3 to generate a haiku.

/v1/haiku/<theme1>/<theme2> -> returns a haiku
"""
import openai

from flask import Flask, jsonify
from flask_cors import cross_origin
from aiku.errors import UnsafeOutput
from aiku.generate import generate_haiku
from aiku.config import OPENAI_SECRET_KEY

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

MAX_WORD_LENGTH = 50

app = Flask(__name__)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["1 per second", "2000 per day"],
)


def _validate_word(word):
    """
    Checks that word isn't empty, that it is only one word and that it's not too long.
    """
    if len(word) == 0 or len(word.split()) > 1:
        return False

    if len(word) > MAX_WORD_LENGTH:
        return False

    return True


@app.route('/v1/haiku/<word1>/<word2>')
@cross_origin()
def haiku(word1, word2):
    """
    Returns a haiku based on the themes.
    """
    word1 = word1.strip()
    word2 = word2.strip()
    if not _validate_word(word1) or not _validate_word(word2):
        return jsonify({"error": "invalid_word", 'message': 'Invalid word'}), 400

    try:
        haiku = generate_haiku(word1, word2, user=get_remote_address())
    except UnsafeOutput:
        return jsonify({"error": "unsafe_output", "message": "invalid input, only returns unsafe output"}), 400
    return jsonify({"haiku": haiku})


if __name__ == '__main__':
    openai.api_key = OPENAI_SECRET_KEY
    app.run(debug=True)
