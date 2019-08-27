import { Repository } from "typeorm";

import { Counter } from "../models";

export default class CounterResolver {
  private readonly repository: Repository<Counter>;

  public constructor(repository: Repository<Counter>) {
    this.repository = repository;
  }

  public async getCounterByUserId(id: Counter["user"]["id"]) {
    return await this.repository.findOne({ where: { user: { id } } });
  }

  public async addCounter(counter: Partial<Counter>) {
    const newCounter = this.repository.create(counter);
    return await this.repository.save(newCounter);
  }

  public async updateCounter(
    id: Counter["id"],
    { name, user }: Partial<Counter>
  ) {
    const updatedCounter = await this.repository.findOne({ id });
    if (updatedCounter) {
      await this.repository.update(id, { name, user });
    }
    return await this.repository.findOne(id);
  }

  public async deleteCounter(id: Counter["id"]) {
    const deletedCounter = await this.repository.findOne({ id });
    if (deletedCounter) {
      await this.repository.delete(deletedCounter);
    }
    return deletedCounter;
  }

  public async getCounter(name: Counter["name"]) {
    return await this.repository.findOne({ name });
  }

  public async getAllCounters() {
    return await this.repository.find();
  }
}
