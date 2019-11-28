import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";

import Counter from "./Counter";

@Entity({ name: "User" })
class User {
  @PrimaryGeneratedColumn({ type: "int" })
  id;

  @Column({
    length: 50,
    type: "varchar",
    unique: true
  })
  username;

  @Column({
    type: "text"
  })
  password;

  @Column({
    length: 100,
    type: "varchar"
  })
  fullname;

  @OneToOne(
    () => Counter,
    counter => counter.user
  )
  counter;

  constructor(columns) {
    if (columns) {
      Object.assign(this, columns);
    }
  }
}

export default User;
