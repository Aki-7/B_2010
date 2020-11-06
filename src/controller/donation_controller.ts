import { Express } from "express";
import getCurrentUser from "../lib/get_current_user";
import { parameter } from "../lib/parameter";
import auth from "../middleware/auth";
import R from "./base/application_router";

const donationRouting = (app: Express) => {
  app.post("/donation/update", auth, update);
};

// TODO: POSTのテスト書く
const update = R(async (req, res) => {
  const { amount } = parameter(req).fields({
    amount: true,
  });

  const user = getCurrentUser(req);

  user.fine = Number(amount);
  await user.save();
  res.redirect("/user");
});

export default donationRouting;
