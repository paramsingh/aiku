import openai
from aiku.random_word import get_random_words

import aiku.config as config
from aiku.generate import generate_haiku
from mastodon import Mastodon


def create_mastodon_client():
    mastodon = Mastodon(
        access_token=config.MASTODON_CONFIG["ACCESS_TOKEN"],
        api_base_url='https://social.param.codes'
    )
    return mastodon


def post_tweet():
    client = create_mastodon_client()
    word1, word2 = get_random_words(2)
    print(f"word1: {word1}, word2: {word2}")
    if not word1 or not word2:
        print("words are invalid exiting")
        return
    haiku = generate_haiku(word1, word2, user='aikucronbot')
    print(f"haiku: {haiku}")
    tweet = f"{haiku}\n\n - @aiku on \"{word1}\" and \"{word2}\" (https://aiku.param.codes)"
    print(f"tweet: {tweet}")
    client.status_post(tweet)
    print(f"tweeted! {tweet}")


if __name__ == '__main__':
    openai.api_key = config.OPENAI_SECRET_KEY
    post_tweet()
