import { Express } from "express";
import getCurrentUser from "../lib/get_current_user";
import { parameter } from "../lib/parameter";
import auth from "../middleware/auth";
import R from "./base/application_router";

const donationRouting = (app: Express) => {
  app.get("/donation", auth, index);
  app.post("/donation", auth, update);
};

const index = R((req, res) => {
  const user = getCurrentUser(req);
  res.render("donation", { amount: user.fine });
});

const update = R(async (req, res) => {
  const { amount } = parameter(req).fields({
    amount: true,
  });

  const user = getCurrentUser(req);

  user.fine = Number(amount);
  await user.save();
  res.redirect("/");
});

export default donationRouting;
