import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";

import Counter from "./Counter";

@Entity({ name: "User" })
export default class User {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({
    length: 50,
    type: "varchar",
    unique: true
  })
  public username: string;

  @Column({
    type: "text"
  })
  public password: string;

  @Column({
    length: 100,
    type: "varchar"
  })
  public fullname: string;

  @OneToOne(() => Counter, counter => counter.user)
  public counter: Counter;
}
