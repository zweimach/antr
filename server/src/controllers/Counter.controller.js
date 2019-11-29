import { ApiStatus, withResponse } from "../utils";
import { Counter } from "../models";

export default class CounterController {
  static setResolver(counterResolver, userResolver) {
    CounterController.counterResolver = counterResolver;
    CounterController.userResolver = userResolver;
  }

  static async getAllCounters(request, response) {
    return response
      .status(ApiStatus.Ok)
      .json(
        withResponse(
          ApiStatus.Ok,
          await CounterController.counterResolver.getAllCounters()
        )
      );
  }

  static async getCounter(request, response) {
    const counter = await CounterController.counterResolver.getCounter(
      parseInt(request.params.id)
    );

    if (!counter) {
      return response
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return response
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, counter));
  }

  static async addCounter(request, response) {
    const { id, name, user } = request.body;

    if (id === undefined || name === undefined) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return response
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

    return response
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, newCounter));
  }

  static async updateCounter(request, response) {
    const { id, name, user } = request.body;

    if (id === undefined || name === undefined) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return response
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
      return response
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return response
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, updatedCounter));
  }

  static async deleteCounter(request, response) {
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

    const deletedUser = await CounterController.counterResolver.deleteCounter(
      parseInt(id)
    );

    if (!deletedUser) {
      return response
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return response
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, deletedUser));
  }
}
