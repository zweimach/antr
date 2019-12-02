export default class ServiceProvider {
  constructor(repository) {
    this.repository = repository;
  }

  async addService(service) {
    const newService = this.repository.create(service);
    return await this.repository.save(newService);
  }

  async updateService(id, { name, type, queues }) {
    const updatedService = await this.repository.findOne({ id });
    if (updatedService) {
      await this.repository.update(id, { name, type });
    }
    if (queues !== undefined) {
      await this.repository.save({ id, queues });
      return await this.repository.findOne({ relations: ["queues"] });
    }
    return await this.repository.findOne(id);
  }

  async deleteService(id) {
    const deletedService = await this.repository.findOne({ id });
    if (deletedService) {
      await this.repository.delete(deletedService);
    }
    return deletedService;
  }

  async getService(id) {
    return await this.repository.findOne({ id });
  }

  async getAllServices() {
    return await this.repository.find();
  }
}
