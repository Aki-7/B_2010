import { Express } from "express";
import webhookAuth from "../../middleware/webhook_auth";
import { CheckWakeupBatch } from "../../batch/check_wakeup_batch";
import R from "../base/application_router";

const checkWakeupRouting = (app: Express) => {
  app.post("/service/check_wakeup", webhookAuth, update);
};

const update = R(async (req, res) => {
  try {
    await CheckWakeupBatch.run();
  } catch (error) {
    res.status(500);
    res.json(error);
  }
  res.status(204);
  res.send();
});

export default checkWakeupRouting;
