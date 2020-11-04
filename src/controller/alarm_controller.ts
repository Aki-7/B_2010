import { Express } from "express";
import auth from "../middleware/auth";
import R from "./base/application_router";

const alarmRouting = (app: Express) => {
  app.get("/alarm", auth, index);
};

const index = R((req, res) => {
  res.render("alarm");
});

export default alarmRouting;
