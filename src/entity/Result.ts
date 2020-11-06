import ApplicationEntity from "./base/application_entity";
import {
  Entity,
  Column,
  ManyToOne,
  getRepository,
  Equal,
  Between,
} from "typeorm";
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

  static async today(user: User): Promise<Result | undefined> {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const todayDate = `${year}-${month}-${date}`;
    const beginningOfDay = "00:00:00";
    const endOfDay = "23:59:59";

    const todayResult = await getRepository(Result).findOne({
      where: {
        userId: Equal(user.id),
        wakedUpAt: Between(
          todayDate + " " + beginningOfDay,
          todayDate + " " + endOfDay
        ),
      },
    });
    return todayResult;
  }
}
