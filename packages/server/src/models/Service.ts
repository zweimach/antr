import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";

import Queue from "./Queue";

@Entity({ name: "Service" })
export default class Service extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({
    length: 1,
    type: "char",
    unique: true
  })
  public type: string;

  @Column({
    length: 50,
    type: "varchar"
  })
  public name: string;

  @OneToMany(() => Queue, queue => queue.service)
  public queues: Queue[];
}
