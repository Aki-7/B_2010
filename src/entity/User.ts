import { Entity, Column, OneToMany } from 'typeorm'
import { IsEmail, IsHash, Length, IsInt, Max, Min } from 'class-validator'
import { getHashSha25 } from '../lib/sha256hash'
import stripe from '../config/stripe'
import ApplicationEntity from './base/application_entity'
import { InternalServerError } from '../lib/errors'
import { Result } from './Result'

@Entity()
export class User extends ApplicationEntity {
  @Length(1, 64)
  @Column({ length: 64 })
  username!: string

  @IsEmail()
  @Column({ unique: true, length: 256 })
  email!: string

  @IsHash('sha256')
  @Column()
  private hashPassword!: string

  @Column({ type: 'datetime', nullable: true })
  targetWakeupTime?: Date

  @Column({ nullable: true, length: 256 })
  twitterOauthToken?: string

  @Column({ nullable: true, length: 256 })
  twitterOauthTokenSecret?: string

  //TODO: strategyでどの曜日にするのか

  /**JPY */
  @Max(5000)
  @Min(0)
  @IsInt()
  @Column({ default: 0 })
  fine!: number

  @OneToMany(() => Result, (result) => result.user)
  results!: Result[]

  @Column()
  stripeId!: string

  async associateStripe() {
    if (this.stripeId !== undefined) return
    if (this.email === undefined)
      throw new InternalServerError('Associate Stripe before setting Email')
    const customer = await stripe.customers.create({ email: this.email })
    this.stripeId = customer.id
  }

  setPassword(plain: string) {
    this.hashPassword = getHashSha25(plain)
  }

  validatePassword(plain: string): boolean {
    return this.hashPassword === getHashSha25(plain)
  }

  // HH:MM -> 日付の変換
  setTargetWakeupTime(time: string) {
    const current = new Date()

    this.targetWakeupTime = new Date(
      `${current.getFullYear()}/${
        current.getMonth() + 1
      }/${current.getDate()} ${time}:00`
    )
  }
  getCurrentTargetWakeupTimeDate() {
    const current = new Date()
    return new Date(
      `${current.getFullYear()}/${
        current.getMonth() + 1
      }/${current.getDate()} ${this.getTargetWakeupTimeString()}:00`
    )
  }

  getTargetWakeupTimeString() {
    const hh = ('0' + this.targetWakeupTime?.getHours()).slice(-2)
    const mm = ('0' + this.targetWakeupTime?.getMinutes()).slice(-2)
    return `${hh}:${mm}`
  }
}
