import { Express } from "express";
import { Result } from "../entity/Result";
import getCurrentUser from "../lib/get_current_user";
import auth from "../middleware/auth";
import R from "./base/application_router";

const resultRouting = (app: Express) => {
  app.post("/result/wakeup", auth, create);
};

const create = R(async (req, res) => {
  const user = getCurrentUser(req);
  const current = new Date();

  Result.wakedUp(current, user);

  res.redirect("/");
});

export default resultRouting;
