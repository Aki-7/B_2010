import { NextFunction, Request, Response } from "express";

const R = (
  handler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void | Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      try {
        await handler(req, res, next);
      } catch (error) {
        next(error);
      }
    })();
  };
};

export default R;
