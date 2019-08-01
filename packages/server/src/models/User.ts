import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "User" })
export default class User extends BaseEntity {
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
}
