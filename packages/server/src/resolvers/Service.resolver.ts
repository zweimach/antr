import { Repository } from "typeorm";

import { Service, Queue } from "../models";

export default class ServiceResolver {
  private readonly repository: Repository<Service>;

  public constructor(repository: Repository<Service>) {
    this.repository = repository;
  }

  public async getServiceByQueueId(id: Queue["id"]) {
    return await this.repository.findOne({ where: { queues: { id } } });
  }

  public async addService(service: Partial<Service>) {
    const newService = this.repository.create(service);
    return await this.repository.save(newService);
  }

  public async updateService(
    id: Service["id"],
    { name, type }: Partial<Service>
  ) {
    const updatedService = await this.repository.findOne({ id });
    if (updatedService) {
      await this.repository.update(id, { name, type });
    }
    return await this.repository.findOne(id);
  }

  public async deleteService(id: Service["id"]) {
    const deletedService = await this.repository.findOne({ id });
    if (deletedService) {
      await this.repository.delete(deletedService);
    }
    return deletedService;
  }

  public async getService(name: Service["name"]) {
    return await this.repository.findOne({ name });
  }

  public async getAllServices() {
    return await this.repository.find();
  }
}
