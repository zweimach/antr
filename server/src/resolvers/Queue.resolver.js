export default class QueueResolver {
  constructor(repository) {
    this.repository = repository;
  }

  async addQueue(queue) {
    const newQueue = this.repository.create(queue);
    return await this.repository.save(newQueue);
  }

  async updateQueue(id, { number, isDone, service }) {
    const updatedQueue = await this.repository.findOne({ id });
    if (updatedQueue) {
      await this.repository.update(id, {
        number,
        isDone,
        service
      });
    }
    if (service) {
      return await this.repository.findOne({ id }, { relations: ["service"] });
    }
    return await this.repository.findOne({ id });
  }

  async deleteQueue(id) {
    const deletedQueue = await this.repository.findOne({ id });
    if (deletedQueue) {
      await this.repository.delete(deletedQueue.id);
    }
    return deletedQueue;
  }

  async getQueue(id) {
    return await this.repository.findOne({ id });
  }

  async getAllQueues() {
    return await this.repository.find();
  }
}
