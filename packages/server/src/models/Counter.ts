import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from "typeorm";

import User from "./User";

@Entity({ name: "Counter" })
export default class Counter {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({
    length: 3,
    type: "varchar"
  })
  public name: string;

  @OneToOne(() => User, user => user.counter)
  @JoinColumn()
  public user: User;
}
