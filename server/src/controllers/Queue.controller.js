import { ApiStatus, withResponse } from "../utils";
import { Queue } from "../models";

export default class QueueController {
  static queueProvider;
  static serviceProvider;

  static setProvider(queueProvider, serviceProvider) {
    QueueController.queueProvider = queueProvider;
    QueueController.serviceProvider = serviceProvider;
  }

  static async getAllQueues(request, response) {
    return response
      .status(ApiStatus.Ok)
      .json(
        withResponse(
          ApiStatus.Ok,
          await QueueController.queueProvider.getAllQueues()
        )
      );
  }

  static async getQueue(request, response) {
    const queue = await QueueController.queueProvider.getQueue(
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
      const serviceInfo = await QueueController.serviceProvider.getService(
        parseInt(id)
      );

      if (serviceInfo) {
        queueInfo.service = serviceInfo;
      }
    }

    const newQueue = await QueueController.queueProvider.addQueue(queueInfo);

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
      const serviceInfo = await QueueController.serviceProvider.getService(
        parseInt(service)
      );

      if (serviceInfo) {
        queueInfo.service = serviceInfo;
      }
    }

    const updatedQueue = await QueueController.queueProvider.updateQueue(
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

    const deletedService = await QueueController.queueProvider.deleteQueue(
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
