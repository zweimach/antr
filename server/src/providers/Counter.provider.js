export default class CounterProvider {
  constructor(repository) {
    this.repository = repository;
  }

  async addCounter(counter) {
    const newCounter = this.repository.create(counter);
    return await this.repository.save(newCounter);
  }

  async updateCounter(id, { name, user }) {
    const updatedCounter = await this.repository.findOne({ id });
    if (updatedCounter) {
      await this.repository.update(id, { name, user });
    }
    if (user) {
      return await this.repository.findOne(id, { relations: ["user"] });
    }
    return await this.repository.findOne(id);
  }

  async deleteCounter(id) {
    const deletedCounter = await this.repository.findOne({ id });
    if (deletedCounter) {
      await this.repository.delete(deletedCounter.id);
    }
    return deletedCounter;
  }

  async getCounter(id) {
    return await this.repository.findOne({ id });
  }

  async getAllCounters() {
    return await this.repository.find();
  }
}
