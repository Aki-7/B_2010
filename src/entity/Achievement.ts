import ApplicationEntity from "./base/application_entity";
import {
  JoinColumn,
  Entity,
  Column,
  ManyToOne,
  getRepository,
  Equal,
  Between,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Achievement extends ApplicationEntity {
  @Column({ length: 256 })
  name!: string;

  @Column()
  readonly userId!: number;

  //一人のユーザーに対して、多くのachievement
  @ManyToOne(() => User, (user) => user.achievements)
  @JoinColumn({ name: "userId" })
  readonly user!: User;

  static async achievedToday(user: User): Promise<boolean> {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const todayDate = `${year}-${month}-${date}`;
    const beginningOfDay = "00:00:00";
    const endOfDay = "23:59:59";

    const todayAchievement = await getRepository(Achievement).find({
      select: ["id"],
      where: {
        userId: Equal(user.id),
        createdAt: Between(
          todayDate + " " + beginningOfDay,
          todayDate + " " + endOfDay
        ),
      },
    });
    return todayAchievement.length > 0;
  }
}
