import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne
} from "typeorm";

import User from "./User";

@Entity({ name: "Counter" })
export default class Counter extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({
    length: 3,
    type: "varchar"
  })
  public name: string;

  @OneToOne(() => User, user => user.counter)
  public user: User;
}
