import { ApiStatus, withResponse } from "../utils";

export default class UserController {
  static userResolver;

  static setResolver(userResolver) {
    UserController.userResolver = userResolver;
  }

  static async getAllUsers(req, res) {
    return res
      .status(ApiStatus.Ok)
      .json(
        withResponse(
          ApiStatus.Ok,
          await UserController.userResolver.getAllUsers()
        )
      );
  }

  static async getUser(req, res) {
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

  static async addUser(req, res) {
    const { id, fullname, username, password } = req.body;

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
      password,
    });

    return res.status(ApiStatus.Ok).json(withResponse(ApiStatus.Ok, newUser));
  }

  static async updateUser(req, res) {
    const { id, fullname, username, password } = req.body;

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

  static async deleteUser(req, res) {
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
