import { NextFunction, Request, Response, RequestHandler } from 'express'

const auth: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated() === true && req.user) return next()
  else {
    return res.redirect('/login')
  }
}

export default auth
