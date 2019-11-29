import { ApiStatus, withResponse } from "../utils";
import { Service } from "../models";

export default class ServiceController {
  static serviceResolver;
  static queueResolver;

  static setResolver(serviceResolver, queueResolver) {
    ServiceController.serviceResolver = serviceResolver;
    ServiceController.queueResolver = queueResolver;
  }

  static async getAllServices(req, res) {
    return res
      .status(ApiStatus.Ok)
      .json(
        withResponse(
          ApiStatus.Ok,
          await ServiceController.serviceResolver.getAllServices()
        )
      );
  }

  static async getService(req, res) {
    const service = await ServiceController.serviceResolver.getService(
      parseInt(req.params.id)
    );

    if (!service) {
      return res
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return res.status(ApiStatus.Ok).json(withResponse(ApiStatus.Ok, service));
  }

  static async addService(req, res) {
    const { id, name, type, queues } = req.body;

    if (id === undefined || name === undefined || type === undefined) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return res
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
        const queueInfo = await ServiceController.queueResolver.getQueue(
          parseInt(queues)
        );
        if (queueInfo) {
          serviceInfo.queues.push(queueInfo);
        }
      };

      if (Array.isArray(queues)) {
        // eslint-disable-next-line
        queues.forEach(await getQueryInfo);
      }
      await getQueryInfo(queues);
    }

    const newService = await ServiceController.serviceResolver.addService(
      serviceInfo
    );

    return res
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, newService));
  }

  static async updateService(req, res) {
    const { id, name, type, queues } = req.body;

    if (id === undefined || name === undefined || type === undefined) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const serviceInfo = new Service({ name, type, queues: [] });

    if (queues !== undefined) {
      const getQueryInfo = async queues => {
        const queueInfo = await ServiceController.queueResolver.getQueue(
          parseInt(queues)
        );
        if (queueInfo) {
          serviceInfo.queues.push(queueInfo);
        }
      };

      if (Array.isArray(queues)) {
        // eslint-disable-next-line
        queues.forEach(await getQueryInfo);
      }
      await getQueryInfo(queues);
    }

    try {
      const updatedService = await ServiceController.serviceResolver.updateService(
        parseInt(id),
        serviceInfo
      );

      if (!updatedService) {
        return res
          .status(ApiStatus.NotFound)
          .json(withResponse(ApiStatus.NotFound));
      }

      return res
        .status(ApiStatus.Ok)
        .json(withResponse(ApiStatus.Ok, updatedService));
    } catch {
      return res
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }
  }

  static async deleteService(req, res) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const deletedQueue = await ServiceController.serviceResolver.deleteService(
      parseInt(id)
    );

    if (!deletedQueue) {
      return res
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return res
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, deletedQueue));
  }
}
