import { ApiStatus, withResponse } from "../utils";
import { Counter } from "../models";

export default class CounterController {
  static setResolver(counterResolver, userResolver) {
    CounterController.counterResolver = counterResolver;
    CounterController.userResolver = userResolver;
  }

  static async getAllCounters(req, res) {
    return res
      .status(ApiStatus.Ok)
      .json(
        withResponse(
          ApiStatus.Ok,
          await CounterController.counterResolver.getAllCounters()
        )
      );
  }

  static async getCounter(req, res) {
    const counter = await CounterController.counterResolver.getCounter(
      parseInt(req.params.id)
    );

    if (!counter) {
      return res
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return res.status(ApiStatus.Ok).json(withResponse(ApiStatus.Ok, counter));
  }

  static async addCounter(req, res) {
    const { id, name, user } = req.body;

    if (id === undefined || name === undefined) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const counterInfo = new Counter({ id: parseInt(id), name });

    if (user !== undefined) {
      const userInfo = await CounterController.userResolver.getUser(
        parseInt(user)
      );

      if (userInfo) {
        counterInfo.user = userInfo;
      }
    }

    const newCounter = await CounterController.counterResolver.addCounter(
      counterInfo
    );

    return res
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, newCounter));
  }

  static async updateCounter(req, res) {
    const { id, name, user } = req.body;

    if (id === undefined || name === undefined) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const counterInfo = new Counter({ name });

    if (user !== undefined) {
      const userInfo = await CounterController.userResolver.getUser(
        parseInt(user)
      );

      if (userInfo) {
        counterInfo.user = userInfo;
      }
    }

    const updatedCounter = await CounterController.counterResolver.updateCounter(
      parseInt(id),
      counterInfo
    );

    if (!updatedCounter) {
      return res
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return res
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, updatedCounter));
  }

  static async deleteCounter(req, res) {
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

    const deletedUser = await CounterController.counterResolver.deleteCounter(
      parseInt(id)
    );

    if (!deletedUser) {
      return res
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return res
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, deletedUser));
  }
}
