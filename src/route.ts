import { Express } from 'express'
import alarmRouting from './controller/alarm_controller'
import authRouting from './controller/auth_controller'
import cardRouting from './controller/card_controller'
import donationRouting from './controller/donation_controller'
import indexRouting from './controller/index_controller'
import snsRouting from './controller/sns_controller'
import userRouting from './controller/user_controller'

const routing = (app: Express) => {
  alarmRouting(app)
  authRouting(app)
  cardRouting(app)
  donationRouting(app)
  indexRouting(app)
  snsRouting(app)
  userRouting(app)
}

export default routing
