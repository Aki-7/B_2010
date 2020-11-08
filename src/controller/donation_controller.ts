import { Express } from "express";
import qs from "query-string";
import stripe from "../config/stripe";
import getCurrentUser from "../lib/get_current_user";
import { parameter } from "../lib/parameter";
import auth from "../middleware/auth";
import R from "./base/application_router";

const donationRouting = (app: Express) => {
  // TODO: POSTのテスト書く
  app.post("/donation/update", auth, update);
  app.post("/donation/pay", auth, pay);
  app.post("/donation/register", auth, donationRegister);
};

const update = R(async (req, res) => {
  const { amount } = parameter(req).fields({
    amount: true,
  });

  const user = getCurrentUser(req);

  user.fine = Number(amount);
  await user.save();
  res.redirect("/user");
});

const pay = R(async (req, res) => {
  const user = getCurrentUser(req);
  const { amount } = parameter(req).fields({
    amount: true,
  });

  const paymentMethods = await stripe.paymentMethods.list({
    customer: user.stripeId,
    type: "card",
  });

  if (paymentMethods.data.length < 1) {
    res.redirect(
      `/donation?${qs.stringify({
        message: "No valid credit card. Please register your card first.",
      })}`
    );
  }

  await stripe.paymentIntents.create({
    amount,
    currency: "jpy",
    customer: user.stripeId,
    payment_method: paymentMethods.data[0].id,
    off_session: true,
    confirm: true,
  });

  res.redirect("/");
});

const donationRegister = R(async (req, res) => {
  const user = getCurrentUser(req);
  const { donationTarget, donationTargetUrl } = parameter(req).fields({
    donationTarget: true,
    donationTargetUrl: true,
  });

  user.donationTarget = donationTarget;
  user.donationTargetUrl = donationTargetUrl;
  await user.save();

  res.redirect("/user");
});

export default donationRouting;
