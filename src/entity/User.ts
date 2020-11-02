import { Entity, Column } from "typeorm";
import ApplicationEntity from "./base/application_entity";

@Entity()
export class User extends ApplicationEntity {
  @Column()
  username!: string;
}
