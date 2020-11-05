import { Express } from 'express'
import * as stripe from '../config/stripe'
import getCurrentUser from '../lib/get_current_user'
import auth from '../middleware/auth'
import R from './base/application_router'

const indexRouting = (app: Express) => {
  app.get('/', auth, index)
}

const index = R(async (req, res) => {
  const user = getCurrentUser(req)
  const intent = await stripe.setupIntents.create({
    customer: user.stripeId,
  })

  const paymentMethods = await stripe.paymentMethods.list({
    customer: user.stripeId,
    type: 'card',
  })

  const cards = paymentMethods.data.map((d) => ({
    last4: d.card?.last4,
    name: d.billing_details.name,
  }))

  res.render('index', { user, client_secret: intent.client_secret, cards })
})

export default indexRouting
