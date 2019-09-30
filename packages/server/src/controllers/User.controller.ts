import { Request, Response } from "express";

import { UserResolver } from "../resolvers";
import { ApiStatus, withResponse } from "../utils";

export default class UserController {
  private static userResolver: UserResolver;

  public static setResolver(userResolver: UserResolver) {
    UserController.userResolver = userResolver;
  }

  public static async getAllUsers(req: Request, res: Response) {
    return res
      .status(ApiStatus.Ok)
      .json(
        withResponse(
          ApiStatus.Ok,
          await UserController.userResolver.getAllUsers()
        )
      );
  }

  public static async getUser(req: Request, res: Response) {
    const user = await UserController.userResolver.getUser(
      parseInt(req.params.id)
    );

    if (!user) {
      return res
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return res.status(ApiStatus.Ok).json(withResponse(ApiStatus.Ok, user));
  }

  public static async addUser(req: Request, res: Response) {
    const { id, fullname, username, password } = req.body as Record<
      string,
      string | undefined
    >;

    if (
      id === undefined ||
      fullname === undefined ||
      username === undefined ||
      password === undefined
    ) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const newUser = await UserController.userResolver.addUser({
      id: parseInt(id),
      fullname,
      username,
      password
    });

    return res.status(ApiStatus.Ok).json(withResponse(ApiStatus.Ok, newUser));
  }

  public static async updateUser(req: Request, res: Response) {
    const { id, fullname, username, password } = req.body as Record<
      string,
      string | undefined
    >;

    if (
      id === undefined ||
      fullname === undefined ||
      username === undefined ||
      password === undefined
    ) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return res
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const updatedUser = await UserController.userResolver.updateUser(
      parseInt(id),
      { username, fullname, password }
    );

    if (!updatedUser) {
      return res
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return res
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, updatedUser));
  }

  public static async deleteUser(req: Request, res: Response) {
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

    const deletedUser = await UserController.userResolver.deleteUser(
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
