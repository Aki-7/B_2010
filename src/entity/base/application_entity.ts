import { validateOrReject } from "class-validator";
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  SaveOptions,
} from "typeorm";

class ApplicationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  readonly valid = async () => {
    await validateOrReject(this);
  };

  async save(options?: SaveOptions) {
    await this.valid();
    return await super.save(options);
  }
}

export default ApplicationEntity;
