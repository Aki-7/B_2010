import ApplicationEntity from "./base/application_entity";
import { JoinColumn, Entity, Column, ManyToOne } from "typeorm";
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
}
