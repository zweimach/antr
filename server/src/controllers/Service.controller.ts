import { Request, Response } from "express";

import { ServiceResolver, QueueResolver } from "../resolvers";
import { ApiStatus, withResponse } from "../utils";
import { Service } from "../models";

export default class ServiceController {
  private static serviceResolver: ServiceResolver;
  private static queueResolver: QueueResolver;

  public static setResolver(
    serviceResolver: ServiceResolver,
    queueResolver: QueueResolver
  ) {
    ServiceController.serviceResolver = serviceResolver;
    ServiceController.queueResolver = queueResolver;
  }

  public static async getAllServices(req: Request, res: Response) {
    return res
      .status(ApiStatus.Ok)
      .json(
        withResponse(
          ApiStatus.Ok,
          await ServiceController.serviceResolver.getAllServices()
        )
      );
  }

  public static async getService(req: Request, res: Response) {
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

  public static async addService(req: Request, res: Response) {
    const { id, name, type, queues } = req.body as Record<
      string,
      string | undefined
    >;

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
      queues: []
    });

    if (queues !== undefined) {
      const getQueryInfo = async (queues: string) => {
        const queueInfo = await ServiceController.queueResolver.getQueue(
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

    const newService = await ServiceController.serviceResolver.addService(
      serviceInfo
    );

    return res
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, newService));
  }

  public static async updateService(req: Request, res: Response) {
    const { id, name, type, queues } = req.body as Record<
      string,
      string | undefined
    >;

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
      const getQueryInfo = async (queues: string) => {
        const queueInfo = await ServiceController.queueResolver.getQueue(
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

  public static async deleteService(req: Request, res: Response) {
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
