import { Express } from "express";
import { Result } from "../entity/Result";
import getCurrentUser from "../lib/get_current_user";
import auth from "../middleware/auth";
import R from "./base/application_router";

const indexRouting = (app: Express) => {
  app.get("/", auth, index);
};

const index = R(async (req, res) => {
  const user = getCurrentUser(req);
  const todayResult = await Result.today(user);

  res.render("index", { user, todayResult });
});

export default indexRouting;
