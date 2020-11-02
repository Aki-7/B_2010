import { Entity, Column } from "typeorm";
import { getHashSha25 } from "../lib/sha256hash";
import ApplicationEntity from "./base/application_entity";

@Entity()
export class User extends ApplicationEntity {
  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  hashPassword!: string;

  setPassword = (plain: string) => {
    this.hashPassword = getHashSha25(plain);
  };

  validatePassword = (plain: string): boolean => {
    return this.hashPassword === getHashSha25(plain);
  };
}
