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

  const todayResult = await Result.today(user);
  if (todayResult) {
    todayResult.wakedUpAt = current;
    await todayResult.save();
  } else {
    const params = {
      userId: user.id,
      status: Result.getStatus(user.targetWakeupTime),
      fine: user.fine,
      wakedUpAt: current,
      targetWakeupTime: user.targetWakeupTime,
    };

    const result = Result.create(params);
    await result.save();
  }
  res.redirect("/");
});

export default resultRouting;
