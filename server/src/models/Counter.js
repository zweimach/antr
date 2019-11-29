import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import User from "./User";

@Entity({ name: "Counter" })
class Counter {
  @PrimaryGeneratedColumn({ type: "int" })
  id;

  @Column({
    length: 3,
    type: "varchar",
  })
  name;

  @OneToOne(
    () => User,
    user => user.counter
  )
  @JoinColumn()
  user;

  constructor(columns) {
    if (columns) {
      Object.assign(this, columns);
    }
  }
}

export default Counter;
