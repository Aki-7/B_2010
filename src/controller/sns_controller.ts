import { Express } from 'express'
import qs from 'query-string'
import request from 'request'
import OAuth from 'oauth-1.0a'
import crypto from 'crypto'
import twitter from 'twitter'
import dayjs from 'dayjs'
import {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET_KEY,
} from '../config/variables'
import auth from '../middleware/auth'
import R from './base/application_router'
import getCurrentUser from '../lib/get_current_user'

const snsRouting = (app: Express) => {
  app.get('/twitter/auth', auth, twitterAuth)
  app.get('/auth/twitter/callback', twitterCallback)
  app.get('/sns', auth, index)
}

const twitterAuth = R((req, res, next) => {
  const oauth = new OAuth({
    consumer: {
      key: TWITTER_CONSUMER_KEY,
      secret: TWITTER_CONSUMER_SECRET_KEY,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto.createHmac('sha1', key).update(base_string).digest('base64')
    },
  })

  const request_data = {
    url: 'https://api.twitter.com/oauth/request_token',
    method: 'POST',
  }
  request(
    {
      url: request_data.url,
      method: request_data.method,
      form: oauth.authorize(request_data),
    },
    (error, response, body) => {
      if (error) {
        console.log(error)
        next(error)
      }
      const { oauth_token } = qs.parse(body)

      res.redirect(
        `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`
      )
    }
  )
})

const twitterCallback = R((req, res, next) => {
  const { oauth_verifier, oauth_token } = req.query
  const user = getCurrentUser(req)

  const oauth = new OAuth({
    consumer: {
      key: TWITTER_CONSUMER_KEY,
      secret: TWITTER_CONSUMER_SECRET_KEY,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto.createHmac('sha1', key).update(base_string).digest('base64')
    },
  })

  const request_data = {
    url: `https://api.twitter.com/oauth/access_token?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`,
    method: 'POST',
    data: { status: 'Hello Ladies + Gentlemen, a signed OAuth request!' },
  }
  request(
    {
      url: request_data.url,
      method: request_data.method,
      form: oauth.authorize(request_data),
    },
    async (error, response, body) => {
      if (error) {
        console.log(error)
        return next(error)
      }
      const {
        oauth_token: oauthToken,
        oauth_token_secret: oauthTokenSecret,
      } = qs.parse(body)

      if (oauthToken && oauthTokenSecret) {
        user.twitterOauthToken = oauthToken as string
        user.twitterOauthTokenSecret = oauthTokenSecret as string
        await user.save()

        const today_date = dayjs()

        const tweetText = `私は今日の朝${today_date.hour()}時${today_date.minute()}分に起きました!素晴らしい！`
        console.log(tweetText)
      }

      res.redirect('/sns')
    }
  )
})

const index = R((req, res) => {
  res.render('sns')
})

export default snsRouting
