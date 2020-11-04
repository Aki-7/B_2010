import ApplicationEntity from "./base/application_entity";
import {
  JoinColumn,
  Entity,
  Column,
  ManyToOne
} from "typeorm";
import { User } from './User'


@Entity({ name: 'achivements' })
export class Achievement extends ApplicationEntity {

  @Column({ type: 'varchar', length: 256 })
  achievementName!: number;

  @Column()
  readonly userId!: number;

  //一人のユーザーに対して、多くのachievement
  @ManyToOne(type => User, user => user.achievements)
  @JoinColumn({ name: 'userId' })
  readonly user!: User;

}
