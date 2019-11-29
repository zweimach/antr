import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from "typeorm";

import Service from "./Service";

@Entity({ name: "Queue" })
class Queue {
  @PrimaryGeneratedColumn({ type: "int" })
  id;

  @Column({
    type: "integer",
  })
  number;

  @Column({
    type: "boolean",
    default: false,
  })
  isDone;

  @CreateDateColumn()
  timestamp;

  @ManyToOne(
    () => Service,
    service => service.queues
  )
  service;

  constructor(columns) {
    if (columns) {
      Object.assign(this, columns);
    }
  }
}

export default Queue;
