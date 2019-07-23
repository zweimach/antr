import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "UserAccount" })
export default class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
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
