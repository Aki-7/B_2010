import { Express } from "express";
import auth from "../middleware/auth";
import R from "./base/application_router";

const userRouting = (app: Express) => {
  app.get("/user", auth, index);
};

const index = R((req, res) => {
  res.render("user");
});

export default userRouting;
