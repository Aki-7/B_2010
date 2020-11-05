import { Express } from "express";
import getCurrentUser from "../lib/get_current_user";
import auth from "../middleware/auth";
import R from "./base/application_router";

const indexRouting = (app: Express) => {
  app.get("/", auth, index);
};

const index = R((req, res) => {
  const user = getCurrentUser(req);

  res.render("index", { user });
});

export default indexRouting;
