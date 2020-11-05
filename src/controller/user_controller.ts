import { Express } from "express";
import stripe from "../config/stripe";
import getCurrentUser from "../lib/get_current_user";
import auth from "../middleware/auth";
import R from "./base/application_router";

const userRouting = (app: Express) => {
  app.get("/user", auth, index);
};

const index = R(async (req, res) => {
  const user = getCurrentUser(req);
  const paymentMethods = await stripe.paymentMethods.list({
    customer: user.stripeId,
    type: "card",
  });

  const cards = paymentMethods.data.map((d) => ({
    last4: d.card?.last4,
    name: d.billing_details.name,
  }));

  res.render("user", { user, cards });
});

export default userRouting;
