import { Request, Response } from "express";

import { CounterResolver, UserResolver } from "../resolvers";
import { ApiStatus, withResponse } from "../utils";
import { Counter } from "../models";

export default class CounterController {
  private static counterResolver: CounterResolver;
  private static userResolver: UserResolver;

  public static setResolver(
    counterResolver: CounterResolver,
    userResolver: UserResolver
  ) {
    CounterController.counterResolver = counterResolver;
    CounterController.userResolver = userResolver;
  }

  public static async getAllCounters(req: Request, res: Response) {
    return res
      .status(ApiStatus.Ok)
      .json(
        withResponse(
          ApiStatus.Ok,
          await CounterController.counterResolver.getAllCounters()
        )
      );
  }

  public static async getCounter(req: Request, res: Response) {
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

  public static async addCounter(req: Request, res: Response) {
    const { id, name, user } = req.body as Record<string, string | undefined>;

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

  public static async updateCounter(req: Request, res: Response) {
    const { id, name, user } = req.body as Record<string, string | undefined>;

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

  public static async deleteCounter(req: Request, res: Response) {
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
