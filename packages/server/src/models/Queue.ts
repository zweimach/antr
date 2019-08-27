import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn
} from "typeorm";

import Service from "./Service";

@Entity({ name: "Queue" })
export default class Queue {
  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({
    type: "integer"
  })
  public number: number;

  @Column({
    type: "boolean",
    default: false
  })
  public isDone: boolean;

  @CreateDateColumn()
  public timestamp: Date;

  @ManyToOne(() => Service, service => service.queues)
  public service: Service;
}
