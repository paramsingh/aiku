import openai
import tweepy
from random_word import RandomWords

import aiku.config as config
from aiku.generate import generate_haiku


def create_tweepy_client():
    auth = tweepy.OAuth1UserHandler(
        config.TWITTER_CONFIG["API_KEY"],
        config.TWITTER_CONFIG["API_KEY_SECRET"],
        config.TWITTER_CONFIG["ACCESS_TOKEN"],
        config.TWITTER_CONFIG["ACCESS_TOKEN_SECRET"],
    )

    api = tweepy.API(auth)
    return api


def get_random_words():
    r = RandomWords()
    for _ in range(20):
        word1 = r.get_random_word(hasDictionaryDef="true")
        word2 = r.get_random_word(hasDictionaryDef="true")
        if word1 and word2 and word1 != word2:
            return word1, word2


def post_tweet():
    api = create_tweepy_client()
    word1, word2 = get_random_words()
    print(f"word1: {word1}, word2: {word2}")
    if not word1 or not word2:
        print("words are invalid exiting")
        return
    haiku = generate_haiku(word1, word2, user='aikucronbot')
    print(f"haiku: {haiku}")
    tweet = f"{haiku}\n\n - @aikuthepoet on \"{word1}\" and \"{word2}\" (aiku.param.codes)"
    print(f"tweet: {tweet}")
    tweet = api.update_status(tweet)
    print(f"tweeted! {tweet}")


if __name__ == '__main__':
    openai.api_key = config.OPENAI_SECRET_KEY
    post_tweet()
