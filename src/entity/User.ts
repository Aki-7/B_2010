import { Entity, Column, OneToMany } from "typeorm";
import { IsEmail, IsHash, Length, IsInt, Max, Min } from "class-validator";
import { getHashSha25 } from "../lib/sha256hash";
import stripe from "../config/stripe";
import ApplicationEntity from "./base/application_entity";
import { InternalServerError } from "../lib/errors";
import { Achievement } from "./Achievement";

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

  @Column({ nullable: true, default: null })
  wakeupTime!: string;

  //TODO: strategyでどの曜日にするのか

  /**JPY */
  @Max(5000)
  @Min(0)
  @IsInt()
  @Column({ default: 0 })
  fine!: number;

  @OneToMany(() => Achievement, (achievement) => achievement.user)
  achievements?: Achievement[];

  @Column()
  stripeId!: string;

  async associateStripe() {
    if (this.stripeId !== undefined) return;
    if (this.email === undefined)
      throw new InternalServerError("Associate Stripe before setting Email");
    const customer = await stripe.customers.create({ email: this.email });
    this.stripeId = customer.id;
  }

  setPassword(plain: string) {
    this.hashPassword = getHashSha25(plain);
  }

  validatePassword(plain: string): boolean {
    return this.hashPassword === getHashSha25(plain);
  }
}
