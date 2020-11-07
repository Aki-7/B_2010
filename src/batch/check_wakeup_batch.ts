import { createConnection, getConnection } from "typeorm";
import stripe from "../config/stripe";
import { Result, Status } from "../entity/Result";
import { User } from "../entity/User";
import { ApplicationBatch } from "./base/application_batch";

// TODO Batchの共通部分をApplicationBatchに切り出す。
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CheckWakeupBatch extends ApplicationBatch {
  static run = async () => {
    const current = new Date();

    const isConnection = await getConnection().isConnected;

    if (!isConnection) {
      await createConnection();
    }

    await Result.createResultIfNeed(current);
    await CheckWakeupBatch.payFineOfFailedUsers();

    if (!isConnection) {
      await getConnection().close();
    }
  };

  static payFineOfFailedUsers = async () => {
    const todayResults = await Result.today();
    await Promise.all(
      todayResults.map(async (result) => {
        if (result.status === Status.FAILED && !result.isPayedFine) {
          const user = await User.findOne({ id: result.userId });
          if (user) {
            await CheckWakeupBatch.payFine(user);
            result.isPayedFine = true;
            result.save();
          }
        }
      })
    );
  };

  static payFine = async (user: User) => {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeId,
      type: "card",
    });

    if (paymentMethods.data.length < 1) {
      console.warn("No valid credit card.");
      return;
    }

    await stripe.paymentIntents.create({
      amount: user.fine,
      currency: "jpy",
      customer: user.stripeId,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
    });

    const tweetText = `寝坊した罰として${user.fine}円が${user.donationTarget}に募金されました。`;

    user.postTwitter(tweetText);
  };
}
