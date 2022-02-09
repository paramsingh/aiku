import tweepy
import aiku.config as config

auth = tweepy.OAuthHandler(
    config.TWITTER_CONFIG['API_KEY'], config.TWITTER_CONFIG['API_KEY_SECRET'])
auth.set_access_token(
    config.TWITTER_CONFIG['ACCESS_TOKEN'], config.TWITTER_CONFIG['ACCESS_TOKEN_SECRET'])

client = tweepy.Client(
    bearer_token=config.TWITTER_CONFIG['BEARER_TOKEN'],
    consumer_key=config.TWITTER_CONFIG['API_KEY'],
    consumer_secret=config.TWITTER_CONFIG['API_KEY_SECRET'],
    access_token=config.TWITTER_CONFIG['ACCESS_TOKEN'],
    access_token_secret=config.TWITTER_CONFIG['ACCESS_TOKEN_SECRET'],
    wait_on_rate_limit=True,

)
print(client.create_tweet(text="test", user_auth=False))
