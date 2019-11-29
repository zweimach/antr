import { withError } from "./ApiStatus";

export default class ApiResponse {
  constructor(status, data, error) {
    this.status = status;
    this.data = data;
    this.error = { isError: false };

    if (error) {
      this.error = {
        isError: true,
        message: error.message,
      };
    }
  }
}

export function withResponse(status, dataOrError) {
  if (dataOrError instanceof Error) {
    return new ApiResponse(status, null, dataOrError);
  } else if (!dataOrError) {
    return new ApiResponse(status, null, withError(status));
  }
  return new ApiResponse(status, dataOrError);
}
