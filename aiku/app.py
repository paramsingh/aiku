"""
A simple flask app which has an endpoint that takes two inputs for themes
and uses GPT-3 to generate a haiku.

/v1/haiku/<theme1>/<theme2> -> returns a haiku
"""
import openai

from flask import Flask, jsonify
from aiku.generate import generate_haiku
from aiku.config import OPENAI_SECRET_KEY

app = Flask(__name__)


@app.route('/v1/haiku/<theme1>/<theme2>')
def haiku(theme1, theme2):
    """
    Returns a haiku based on the themes.
    """
    haiku = generate_haiku(theme1, theme2)
    return jsonify({"haiku": haiku})


if __name__ == '__main__':
    openai.api_key = OPENAI_SECRET_KEY
    app.run(debug=True)
