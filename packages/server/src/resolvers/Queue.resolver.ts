import { Between, Repository } from "typeorm";
import { startOfToday, endOfToday } from "date-fns";

import { Queue } from "../models";

export default class QueueResolver {
  private readonly repository: Repository<Queue>;

  public constructor(repository: Repository<Queue>) {
    this.repository = repository;
  }

  public async getQueuesByServiceId(id: Queue["service"]["id"]) {
    return await this.repository.find({ where: { service: { id } } });
  }

  public async addQueue(queue: Partial<Queue>) {
    const newQueue = this.repository.create(queue);
    return await this.repository.save(newQueue);
  }

  public async updateQueue(
    id: Queue["id"],
    { number, isDone, service }: Partial<Queue>
  ) {
    const updatedQueue = await this.repository.findOne({ id });
    if (updatedQueue) {
      await this.repository.update(id, {
        number,
        isDone,
        service
      });
    }
    return await this.repository.findOne({ id });
  }

  public async deleteQueue(id: Queue["id"]) {
    const deletedQueue = await this.repository.findOne({ id });
    if (deletedQueue) {
      await this.repository.delete(deletedQueue.id);
    }
    return deletedQueue;
  }

  public async getQueue(id: Queue["id"]) {
    return await this.repository.findOne({ id });
  }

  public async getAllQueues() {
    return await this.repository.find();
  }

  public async countAllQueuesToday() {
    return await this.repository.count({
      where: {
        timestamp: Between(startOfToday, endOfToday)
      }
    });
  }

  public async getAllQueuesToday() {
    return await this.repository.find({
      where: {
        timestamp: Between(startOfToday, endOfToday)
      },
      order: {
        id: "DESC"
      }
    });
  }
}
