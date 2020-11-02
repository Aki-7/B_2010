import { NextFunction, Request, Response } from "express";
import { ApplicationError, HttpError } from "../lib/errors";

const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApplicationError) {
    if (err instanceof HttpError) {
      res.statusCode = err.status;
    } else {
      res.statusCode = 500;
    }
    return res.send(
      `<h1>Application Error</h1><h3>${err.message}</h3><div><pre>${err.stack}</pre></div>`
    );
  } else {
    next(err);
  }
};

export default errorHandler;
