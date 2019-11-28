import { ApiStatus, withResponse } from "../utils";
import { Queue } from "../models";

export default class QueueController {
  static queueResolver;
  static serviceResolver;

  static setResolver(queueResolver, serviceResolver) {
    QueueController.queueResolver = queueResolver;
    QueueController.serviceResolver = serviceResolver;
  }

  static async getAllQueues(req, res) {
    return res
      .status(ApiStatus.Ok)
      .json(
        withResponse(
          ApiStatus.Ok,
          await QueueController.queueResolver.getAllQueues()
        )
      );
  }

  static async getQueue(req, res) {
    const queue = await QueueController.queueResolver.getQueue(
      parseInt(req.params.id)
    );

    if (!queue) {
      return res
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return res.status(ApiStatus.Ok).json(withResponse(ApiStatus.Ok, queue));
  }

  static async addQueue(req, res) {
    const { id, isDone, number, service } = req.body;

    if (id === undefined || number === undefined || isDone === undefined) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (
      isNaN(parseInt(id)) ||
      isNaN(parseInt(number)) ||
      typeof Boolean(isDone) !== "boolean"
    ) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const queueInfo = new Queue({
      id: parseInt(id),
      isDone: Boolean(isDone),
      number: parseInt(number)
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

    return res.status(ApiStatus.Ok).json(withResponse(ApiStatus.Ok, newQueue));
  }

  static async updateQueue(req, res) {
    const { id, isDone, number, service } = req.body;

    if (id === undefined || number === undefined || isDone === undefined) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (
      isNaN(parseInt(id)) ||
      isNaN(parseInt(number)) ||
      typeof Boolean(isDone) !== "boolean"
    ) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const queueInfo = new Queue({
      id: parseInt(id),
      isDone: Boolean(isDone),
      number: parseInt(number)
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
      return res
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return res
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, updatedQueue));
  }

  static async deleteQueue(req, res) {
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

    const deletedService = await QueueController.queueResolver.deleteQueue(
      parseInt(id)
    );

    if (!deletedService) {
      return res
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return res
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, deletedService));
  }
}
