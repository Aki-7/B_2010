import { Express } from "express";
import { Achievement } from "../entity/Achievement";
import getCurrentUser from "../lib/get_current_user";
import auth from "../middleware/auth";
import R from "./base/application_router";

const achievementRouting = (app: Express) => {
  app.post("/achievement", auth, create);
};

const create = R(async (req, res) => {
  const user = getCurrentUser(req);

  const params = {
    achievementName: "",
    userId: user.id,
  };

  const achievement = Achievement.create(params);
  await achievement.valid();
  await achievement.save();
  res.redirect("/");
});

export default achievementRouting;
