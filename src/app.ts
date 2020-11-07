import express from 'express'
import http from 'http'
import path from 'path'
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy } from 'passport-twitter'
import bodyParser from 'body-parser'
import { SECRET } from './config/variables'
import sessionStore from './config/session_store'
import { User } from './entity/User'
import errorHandler from './middleware/error_handler'
import routing from './route'
import {
  TWITTER_API_ACCESS_TOKEN_SECRET,
  TWITTER_API_ACCESS_TOKEN,
  TWITTER_CONSUMER_SECRET_KEY,
  TWITTER_CONSUMER_KEY,
  TWITTER_CALLBACK_URL,
} from './config/variables'
export const createApp = () => {
  const app = express()
  const server = http.createServer(app)

  app.set('view engine', 'pug')
  app.set('views', path.join(process.cwd(), 'template'))

  app.use('/static', express.static('static'))

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(
    session({
      secret: SECRET,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user: User, done) => done(null, user.id))
  passport.deserializeUser(async (id: number, done) => {
    const user = await User.findOne(id)
    if (!user) return done(null, null)
    return done(null, user)
  })
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email })
          if (!user) return done(null, null)
          if (!user.validatePassword(password)) return done(null, null)
          return done(null, user)
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  routing(app)

  app.use(errorHandler)

  return { app, server }
}
