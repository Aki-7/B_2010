import { Express } from "express";
import getCurrentUser from "../lib/get_current_user";
import auth from "../middleware/auth";
import R from "./base/application_router";

const userRouting = (app: Express) => {
  app.get("/user", auth, index);
};

const index = R((req, res) => {
  const user = getCurrentUser(req);

  res.render("user", { user });
});

export default userRouting;
