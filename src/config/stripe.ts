import Stripe from 'stripe'
import { ENV, STRIPE_API_KEY } from './variables'

const options: Stripe.StripeConfig = ((env) => {
  switch (env) {
    case 'test':
      return {
        apiVersion: '2020-08-27',
        host: 'localhost',
        port: 12111,
        protocol: 'http',
      } as const
    default:
      return {
        apiVersion: '2020-08-27',
      } as const
  }
})(ENV)

const stripe = new Stripe(STRIPE_API_KEY, options)

export const customers = stripe.customers
export const setupIntents = stripe.setupIntents
export const paymentMethods = stripe.paymentMethods
