import { Repository } from "typeorm";

import { User } from "../models";

export default class UserResolver {
  private readonly repository: Repository<User>;

  public constructor(repository: Repository<User>) {
    this.repository = repository;
  }

  public async addUser(user: Partial<User>) {
    const newUser = this.repository.create(user);
    return await this.repository.save(newUser);
  }

  public async updateUser(
    id: User["id"],
    { fullname, username, password }: Partial<User>
  ) {
    const updatedUser = await this.repository.findOne({ id });
    if (updatedUser) {
      await this.repository.update(id, { username, password, fullname });
    }
    return await this.repository.findOne(id);
  }

  public async deleteUser(id: User["id"]) {
    const deletedUser = await this.repository.findOne({ id });
    if (deletedUser) {
      await this.repository.delete(deletedUser);
    }
    return deletedUser;
  }

  public async getUser(id: User["id"]) {
    return await this.repository.findOne({ id });
  }

  public async getAllUsers() {
    return await this.repository.find();
  }
}
