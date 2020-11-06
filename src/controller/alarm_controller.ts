import { Express } from "express";
import getCurrentUser from "../lib/get_current_user";
import { parameter } from "../lib/parameter";
import auth from "../middleware/auth";
import R from "./base/application_router";

const alarmRouting = (app: Express) => {
  app.post("/alarm/update", auth, update);
};

const update = R(async (req, res) => {
  const { targetWakeupTime } = parameter(req).fields({
    targetWakeupTime: true,
  });

  const user = getCurrentUser(req);

  user.setTargetWakeupTime(targetWakeupTime);
  await user.save();
  res.redirect("/user");
});

export default alarmRouting;
