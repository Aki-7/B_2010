import { Express } from "express";
import day from "dayjs";
import stripe from "../config/stripe";
import { Result } from "../entity/Result";
import getCurrentUser from "../lib/get_current_user";
import auth from "../middleware/auth";
import R from "./base/application_router";
import { parameter } from "../lib/parameter";

const LABEL_LIST = ["Computer", "Clock", "Book"];

const indexRouting = (app: Express) => {
  app.get("/", auth, index);
};

const index = R(async (req, res) => {
  const label = req.query["label"] as string;
  const status = req.query["status"] as string;
  const annotation = req.query["annotation"] as string;

  const randomLabel = label
    ? label
    : LABEL_LIST[Math.floor(Math.random() * LABEL_LIST.length)];
  const user = getCurrentUser(req);
  const todayResult = await Result.today(user);

  const apiResponse = await stripe.paymentIntents.list({
    customer: user.stripeId,
    created: {
      gte: Math.floor(
        day()
          .set("day", 0)
          .set("h", 0)
          .set("m", 0)
          .set("s", 0)
          .set("ms", 0)
          .toDate()
          .getTime() / 1000
      ),
    },
  });
  const paymentIntents = apiResponse.data;
  const sum = paymentIntents.reduce((sum, paymentIntent) => {
    return sum + paymentIntent.amount_received;
  }, 0);

  console.log(label, status, annotation);

  res.render("index", {
    user,
    todayResult,
    sum,
    label: randomLabel,
    status,
    annotation,
  });
});

export default indexRouting;
