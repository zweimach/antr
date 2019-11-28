import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import Queue from "./Queue";

@Entity({ name: "Service" })
class Service {
  @PrimaryGeneratedColumn({ type: "int" })
  id;

  @Column({
    length: 1,
    type: "varchar",
    unique: true
  })
  type;

  @Column({
    length: 50,
    type: "varchar"
  })
  name;

  @OneToMany(
    () => Queue,
    queue => queue.service
  )
  queues;

  constructor(columns) {
    if (columns) {
      Object.assign(this, columns);
    }
  }
}

export default Service;
