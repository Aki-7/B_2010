import { Express } from 'express'
import authRouting from './controller/auth_controller'
import indexRouting from './controller/index_controller'

const routing = (app: Express) => {
  authRouting(app)
  indexRouting(app)
}

export default routing
