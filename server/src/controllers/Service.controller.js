import { ApiStatus, withResponse } from "../utils";
import { Service } from "../models";

export default class ServiceController {
  static serviceProvider;
  static queueProvider;

  static setProvider(serviceProvider, queueProvider) {
    ServiceController.serviceProvider = serviceProvider;
    ServiceController.queueProvider = queueProvider;
  }

  static async getAllServices(request, response) {
    return response
      .status(ApiStatus.Ok)
      .json(
        withResponse(
          ApiStatus.Ok,
          await ServiceController.serviceProvider.getAllServices()
        )
      );
  }

  static async getService(request, response) {
    const service = await ServiceController.serviceProvider.getService(
      parseInt(request.params.id)
    );

    if (!service) {
      return response
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return response
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, service));
  }

  static async addService(request, response) {
    const { id, name, type, queues } = request.body;

    if (id === undefined || name === undefined || type === undefined) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const serviceInfo = new Service({
      id: parseInt(id),
      name,
      type,
      queues: [],
    });

    if (queues !== undefined) {
      const getQueryInfo = async queues => {
        const queueInfo = await ServiceController.queueProvider.getQueue(
          parseInt(queues)
        );
        if (queueInfo) {
          serviceInfo.queues.push(queueInfo);
        }
      };

      if (Array.isArray(queues)) {
        queues.forEach(await getQueryInfo);
      }
      await getQueryInfo(queues);
    }

    const newService = await ServiceController.serviceProvider.addService(
      serviceInfo
    );

    return response
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, newService));
  }

  static async updateService(request, response) {
    const { id, name, type, queues } = request.body;

    if (id === undefined || name === undefined || type === undefined) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const serviceInfo = new Service({ name, type, queues: [] });

    if (queues !== undefined) {
      const getQueryInfo = async queues => {
        const queueInfo = await ServiceController.queueProvider.getQueue(
          parseInt(queues)
        );
        if (queueInfo) {
          serviceInfo.queues.push(queueInfo);
        }
      };

      if (Array.isArray(queues)) {
        queues.forEach(await getQueryInfo);
      }
      await getQueryInfo(queues);
    }

    try {
      const updatedService = await ServiceController.serviceProvider.updateService(
        parseInt(id),
        serviceInfo
      );

      if (!updatedService) {
        return response
          .status(ApiStatus.NotFound)
          .json(withResponse(ApiStatus.NotFound));
      }

      return response
        .status(ApiStatus.Ok)
        .json(withResponse(ApiStatus.Ok, updatedService));
    } catch {
      return response
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }
  }

  static async deleteService(request, response) {
    const { id } = request.params;

    if (!id) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const deletedQueue = await ServiceController.serviceProvider.deleteService(
      parseInt(id)
    );

    if (!deletedQueue) {
      return response
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return response
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, deletedQueue));
  }
}
