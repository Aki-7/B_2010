import { NextFunction, Request, Response, RequestHandler } from "express";

const webhookAuth: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO tokenによる認証をいれる
  return next();
};

export default webhookAuth;
