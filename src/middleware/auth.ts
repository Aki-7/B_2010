import { NextFunction, Request, Response, RequestHandler } from 'express'
import { NotAuthorizedError } from '../lib/errors'

const auth: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated() === true && req.user) return next()
  else {
    return next(new NotAuthorizedError('ユーザ認証に失敗しました'))
  }
}

export default auth
