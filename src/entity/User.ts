import { Entity, Column } from "typeorm";
import { IsEmail, IsHash, Length } from "class-validator";
import { getHashSha25 } from "../lib/sha256hash";
import ApplicationEntity from "./base/application_entity";

@Entity()
export class User extends ApplicationEntity {
  @Length(1, 64)
  @Column({ length: 64 })
  username!: string;

  @IsEmail()
  @Column({ unique: true, length: 256 })
  email!: string;

  @IsHash("sha256")
  @Column()
  private hashPassword!: string;

  setPassword = (plain: string) => {
    this.hashPassword = getHashSha25(plain);
  };

  validatePassword = (plain: string): boolean => {
    return this.hashPassword === getHashSha25(plain);
  };
}
