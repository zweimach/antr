import { Service, Queue } from "../models";

const serviceResolver = {
  Service: {
    async queues({ id }: Service) {
      return await Queue.find({
        where: {
          service: {
            id
          }
        }
      });
    }
  },
  Mutation: {
    async addService(_: null, args: Service) {
      const newService = Service.create(args);
      await newService.save();
      return newService;
    },
    async updateService(_: null, { id, name, type, queues }: Service) {
      Service.update(id, {
        name,
        type,
        queues
      });
      return await Service.findOne({ id });
    },
    async deleteService(_: null, { id }: Service) {
      const deletedService = await Service.findOne({ id });
      if (deletedService) {
        Service.delete(deletedService);
      }
      return deletedService;
    }
  },
  Query: {
    async getService(_: null, { id }: Service) {
      return await Service.findOne({ id });
    },
    async getAllServices() {
      return await Service.find();
    }
  }
};

export default serviceResolver;
