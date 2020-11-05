import { Express } from "express";
import stripe from "../config/stripe";
import { STRIPE_PUB_KEY } from "../config/variables";
import getCurrentUser from "../lib/get_current_user";
import auth from "../middleware/auth";
import R from "./base/application_router";

const cardRouting = (app: Express) => {
  app.get("/card/new", auth, newCard);
};

const newCard = R(async (req, res) => {
  const user = getCurrentUser(req);

  const intent = await stripe.setupIntents.create({
    customer: user.stripeId,
  });
  res.render("card/new", {
    client_secret: intent.client_secret,
    stripe_pub_key: STRIPE_PUB_KEY,
  });
});

export default cardRouting;
