export const ApiStatus = {
  Ok: 200,
  Created: 201,
  Accepted: 202,
  BadRequest: 400,
  Forbidden: 403,
  NotFound: 404,
  InternalServerError: 500,
  NotImplemented: 501
};

export function withError(status) {
  switch (status) {
    case ApiStatus.BadRequest:
      return new Error("Bad Request");

    case ApiStatus.Forbidden:
      return new Error("Forbidden");

    case ApiStatus.NotFound:
      return new Error("Not Found");

    case ApiStatus.InternalServerError:
      return new Error("Internal Server Error");

    case ApiStatus.NotImplemented:
      return new Error("Not Implemented");

    default:
      throw "Bad Response";
  }
}
