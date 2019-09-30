import { Repository } from "typeorm";

import { Service } from "../models";

export default class ServiceResolver {
  private readonly repository: Repository<Service>;

  public constructor(repository: Repository<Service>) {
    this.repository = repository;
  }

  public async addService(service: Partial<Service>) {
    const newService = this.repository.create(service);
    return await this.repository.save(newService);
  }

  public async updateService(
    id: Service["id"],
    { name, type, queues }: Partial<Service>
  ) {
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

  public async deleteService(id: Service["id"]) {
    const deletedService = await this.repository.findOne({ id });
    if (deletedService) {
      await this.repository.delete(deletedService);
    }
    return deletedService;
  }

  public async getService(id: Service["id"]) {
    return await this.repository.findOne({ id });
  }

  public async getAllServices() {
    return await this.repository.find();
  }
}
