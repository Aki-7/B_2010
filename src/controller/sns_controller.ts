import { Express } from "express";
import auth from "../middleware/auth";
import R from "./base/application_router";

const snsRouting = (app: Express) => {
  app.get("/sns", auth, index);
};

const index = R((req, res) => {
  res.render("sns");
});

export default snsRouting;
