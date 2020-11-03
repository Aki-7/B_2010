import { Entity, Column } from "typeorm";
import { IsEmail, IsHash, Length } from "class-validator";
import { getHashSha25 } from "../lib/sha256hash";
import { customers } from "../config/stripe";
import ApplicationEntity from "./base/application_entity";
import { InternalServerError } from "../lib/errors";

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

  @Column()
  stripeId!: string;

  async associateStripe() {
    if (this.stripeId !== undefined) return;
    if (this.email === undefined)
      throw new InternalServerError("Associate Stripe before setting Email");
    const customer = await customers.create({ email: this.email });
    this.stripeId = customer.id;
  }

  setPassword = (plain: string) => {
    this.hashPassword = getHashSha25(plain);
  };

  validatePassword = (plain: string): boolean => {
    return this.hashPassword === getHashSha25(plain);
  };
}
