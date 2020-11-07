import ApplicationEntity from "./base/application_entity";
import { Entity, Column, ManyToOne, Equal, Between } from "typeorm";
import { User } from "./User";

export enum Status {
  SUCCESS = "success",
  FAILED = "failed",
  PENDING = "pending",
}

@Entity()
export class Result extends ApplicationEntity {
  @Column({ length: 256 })
  @Column()
  readonly userId!: number;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
  })
  status!: Status;

  @Column()
  fine?: number;

  @Column({ default: false })
  isPayedFine!: boolean;

  @Column({ type: "datetime", nullable: true })
  wakedUpAt?: Date;

  @Column({ type: "datetime", nullable: true })
  targetWakeupTime?: Date;

  @ManyToOne(() => User, (user) => user.results)
  readonly user!: User;

  static async wakedUp(current: Date, user: User) {
    const todayResult = await Result.today(user);
    if (todayResult) {
      todayResult.wakedUpAt = current;
      await todayResult.save();

      let tweetText = `${todayResult.getWakedUpTime()}に起きました！`;
      if (todayResult.status === Status.FAILED) {
        tweetText += `目標は${user.getTargetWakeupTimeString()}なので無能です。${
          user.fine
        }円が募金されます。`;
      } else if (todayResult.status === Status.SUCCESS) {
        tweetText += `目標は${user.getTargetWakeupTimeString()}なので有能です。`;
      }
      user.postTwitter(tweetText);
    } else {
      const params = {
        userId: user.id,
        status: Result.getStatus(user.targetWakeupTime),
        fine: user.fine,
        wakedUpAt: current,
        targetWakeupTime: user.targetWakeupTime,
      };

      const result = Result.create(params);
      await result.save();

      let tweetText = `${result.getWakedUpTime()}に起きました！`;
      if (result.status === Status.FAILED) {
        tweetText += `目標は${user.getTargetWakeupTimeString()}なので無能です。`;
      } else if (result.status === Status.SUCCESS) {
        tweetText += `目標は${user.getTargetWakeupTimeString()}なので有能です。`;
      }
      user.postTwitter(tweetText);
    }
  }

  static getStatus(targetWakeupTime: Date | undefined): Status {
    const current = new Date();
    if (!targetWakeupTime) {
      return Status.PENDING;
    } else if (targetWakeupTime < current) {
      return Status.FAILED;
    } else {
      return Status.SUCCESS;
    }
  }

  static async today(): Promise<Result[]>;
  static async today(user: User): Promise<Result | undefined>;
  static async today(user?: User): Promise<Result | Result[] | undefined> {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const todayDate = `${year}-${month}-${date}`;
    const beginningOfDay = "00:00:00";
    const endOfDay = "23:59:59";

    if (user) {
      return await Result.findOne({
        where: {
          userId: Equal(user.id),
          createdAt: Between(
            todayDate + " " + beginningOfDay,
            todayDate + " " + endOfDay
          ),
        },
      });
    } else {
      return await Result.find({
        where: {
          createdAt: Between(
            todayDate + " " + beginningOfDay,
            todayDate + " " + endOfDay
          ),
        },
      });
    }
  }

  static async createResultIfNeed(current: Date): Promise<void> {
    const todayResults = await Result.today();
    const userIdListWithTodayResult = await todayResults.map(
      (result) => result.userId
    );
    const userListWithoutTodayResult =
      userIdListWithTodayResult.length > 0
        ? await User.createQueryBuilder("user")
            .where("user.id NOT IN (:...ids)", {
              ids: userIdListWithTodayResult,
            })
            .getMany()
        : await User.find();

    // TODO: transaction処理にするか検討する
    await Promise.all(
      userListWithoutTodayResult.map(async (user) => {
        if (
          user.targetWakeupTime &&
          user.getCurrentTargetWakeupTimeDate() < current
        ) {
          const params = {
            userId: user.id,
            status: Status.FAILED,
            fine: user.fine,
            targetWakeupTime: user.targetWakeupTime,
          };

          const result = Result.create(params);
          await result.save();
        }
      })
    );
  }

  getWakedUpTime() {
    const hh = ("0" + this.wakedUpAt?.getHours()).slice(-2);
    const mm = ("0" + this.wakedUpAt?.getMinutes()).slice(-2);
    return `${hh}:${mm}`;
  }
}
