import { Express } from 'express'
import express from 'express'
import twitter from 'twitter-lite'
import auth from '../middleware/auth'
import R from './base/application_router'
import {
  TWITTER_API_ACCESS_TOKEN_SECRET,
  TWITTER_API_ACCESS_TOKEN,
  TWITTER_CONSUMER_SECRET_KEY,
  TWITTER_CONSUMER_KEY,
  TWITTER_CALLBACK_URL,
} from '../config/variables'
import oauth from 'oauth'

const consumer = new oauth.OAuth(
  'https://twitter.com/oauth/request_token',
  'https://twitter.com/oauth/access_token',
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET_KEY,
  '1.0A',
  TWITTER_CALLBACK_URL,
  'HMAC-SHA1'
)
const router = express.Router()

router.get('/connect', (req, res) => {
  consumer.getOAuthRequestToken(
    (error, oauthToken, oauthTokenSecret, results) => {
      if (error) {
        res.status(500)
        res.send(error)
      } else {
        if (req.session === undefined) return
        req.session.oauthRequestToken = oauthToken
        req.session.oauthRequestTokenSecret = oauthTokenSecret
        const redirect = {
          redirectUrl: `https://twitter.com/oauth/authorize?  oauth_token=${req.session.oauthRequestToken}`,
        }
        res.send(redirect)
      }
    }
  )
})

router.get('/saveAccessTokens', (req, res) => {
  if (req.session === undefined) return
  consumer.getOAuthAccessToken(
    req.query.oauth_token as string,
    req.session.oauthRequestTokenSecret,
    req.query.oauth_verifier as string,
    (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
      if (req.session === undefined) return
      if (error) {
        res.send(error)
        res.status(500)
      } else {
        req.session.oauthAccessToken = oauthAccessToken
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret
        return res.send({ message: 'token saved' })
      }
    }
  )
})

const twitterConfig = {
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET_KEY,
  access_token_key: TWITTER_API_ACCESS_TOKEN,
  access_token_secret: TWITTER_API_ACCESS_TOKEN_SECRET,
}

const client = new twitter(twitterConfig)

const snsRouting = (app: Express) => {
  // client
  //   .post('statuses/update', { status: '9時に起きました' })
  //   .then((result: { text: string }) => {
  //     console.log('You successfully tweeted this : "' + result.text + '"')
  //   })
  //   .catch(console.error)
  app.get('/sns', auth, index)
}

const index = R((req, res) => {
  res.render('sns')
})

export default { snsRouting }

module.exports = router
