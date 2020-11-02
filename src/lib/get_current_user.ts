import { Request } from "express";
import { User } from "../entity/User";
import { NotAuthorizedError } from "./errors";

const getCurrentUser = (req: Request): User => {
  const user = req.user;
  if (user === undefined)
    throw new NotAuthorizedError("ユーザーが見つかりません");
  return user as User;
};

export default getCurrentUser;
