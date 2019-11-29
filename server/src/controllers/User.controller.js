import { ApiStatus, withResponse } from "../utils";

export default class UserController {
  static userResolver;

  static setResolver(userResolver) {
    UserController.userResolver = userResolver;
  }

  static async getAllUsers(request, response) {
    return response
      .status(ApiStatus.Ok)
      .json(
        withResponse(
          ApiStatus.Ok,
          await UserController.userResolver.getAllUsers()
        )
      );
  }

  static async getUser(request, response) {
    const user = await UserController.userResolver.getUser(
      parseInt(request.params.id)
    );

    if (!user) {
      return response
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return response.status(ApiStatus.Ok).json(withResponse(ApiStatus.Ok, user));
  }

  static async addUser(request, response) {
    const { id, fullname, username, password } = request.body;

    if (
      id === undefined ||
      fullname === undefined ||
      username === undefined ||
      password === undefined
    ) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const newUser = await UserController.userResolver.addUser({
      id: parseInt(id),
      fullname,
      username,
      password,
    });

    return response
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, newUser));
  }

  static async updateUser(request, response) {
    const { id, fullname, username, password } = request.body;

    if (
      id === undefined ||
      fullname === undefined ||
      username === undefined ||
      password === undefined
    ) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    } else if (isNaN(parseInt(id))) {
      return response
        .status(ApiStatus.BadRequest)
        .json(withResponse(ApiStatus.BadRequest));
    }

    const updatedUser = await UserController.userResolver.updateUser(
      parseInt(id),
      { username, fullname, password }
    );

    if (!updatedUser) {
      return response
        .status(ApiStatus.NotFound)
        .json(withResponse(ApiStatus.NotFound));
    }

    return response
      .status(ApiStatus.Ok)
      .json(withResponse(ApiStatus.Ok, updatedUser));
  }

  static async deleteUser(request, response) {
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

    const deletedUser = await UserController.userResolver.deleteUser(
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
