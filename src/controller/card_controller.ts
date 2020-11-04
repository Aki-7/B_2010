import { Express } from "express";
import auth from "../middleware/auth";
import R from "./base/application_router";

const cardRouting = (app: Express) => {
  app.get("/card", auth, index);
};

const index = R((req, res) => {
  res.render("card");
});

export default cardRouting;
