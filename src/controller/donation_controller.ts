import { Express } from "express";
import auth from "../middleware/auth";
import R from "./base/application_router";

const donationRouting = (app: Express) => {
  app.get("/donation", auth, index);
};

const index = R((req, res) => {
  res.render("donation");
});

export default donationRouting;
