import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import Queue from "./Queue";

@Entity({ name: "Service" })
export default class Service {
  @PrimaryGeneratedColumn({ type: "int" })
  public id!: number;

  @Column({
    length: 1,
    type: "varchar",
    unique: true
  })
  public type!: string;

  @Column({
    length: 50,
    type: "varchar"
  })
  public name!: string;

  @OneToMany(() => Queue, queue => queue.service)
  public queues!: Queue[];

  public constructor(columns?: Partial<Service>) {
    if (columns) {
      Object.assign(this, columns);
    }
  }
}
