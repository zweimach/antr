import { ApiStatus, withResponse } from "../utils";
import { Queue } from "../models";

export default class QueueController {
  static queueResolver;
  static serviceResolver;

  static setResolver(queueResolver, serviceResolver) {
    QueueController.queueResolver = queueResolver;
    QueueController.serviceResolver = serviceResolver;
  }

  static async getAllQueues(request, response) {
    return response
      .status(ApiStatus.Ok)
      .json(
        withResponse(
          ApiStatus.Ok,
          await QueueController.queueResolver.getAllQueues()
        )
      );
  }

  static async getQueue(request, response) {
    const queue = await QueueController.queueResolver.getQueue(
      parseInt(request.params.id)
    );

    if (!queue) {
      return response
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return response
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, queue));
  }

  static async addQueue(request, response) {
    const { id, isDone, number, service } = request.body;

    if (id === undefined || number === undefined || isDone === undefined) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (
      isNaN(parseInt(id)) ||
      isNaN(parseInt(number)) ||
      typeof Boolean(isDone) !== "boolean"
    ) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const queueInfo = new Queue({
      id: parseInt(id),
      isDone: Boolean(isDone),
      number: parseInt(number),
    });

    if (service !== undefined) {
      const serviceInfo = await QueueController.serviceResolver.getService(
        parseInt(id)
      );

      if (serviceInfo) {
        queueInfo.service = serviceInfo;
      }
    }

    const newQueue = await QueueController.queueResolver.addQueue(queueInfo);

    return response
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, newQueue));
  }

  static async updateQueue(request, response) {
    const { id, isDone, number, service } = request.body;

    if (id === undefined || number === undefined || isDone === undefined) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (
      isNaN(parseInt(id)) ||
      isNaN(parseInt(number)) ||
      typeof Boolean(isDone) !== "boolean"
    ) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const queueInfo = new Queue({
      id: parseInt(id),
      isDone: Boolean(isDone),
      number: parseInt(number),
    });

    if (service !== undefined) {
      const serviceInfo = await QueueController.serviceResolver.getService(
        parseInt(service)
      );

      if (serviceInfo) {
        queueInfo.service = serviceInfo;
      }
    }

    const updatedQueue = await QueueController.queueResolver.updateQueue(
      parseInt(id),
      queueInfo
    );

    if (!updatedQueue) {
      return response
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return response
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, updatedQueue));
  }

  static async deleteQueue(request, response) {
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

    const deletedService = await QueueController.queueResolver.deleteQueue(
      parseInt(id)
    );

    if (!deletedService) {
      return response
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return response
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, deletedService));
  }
}
