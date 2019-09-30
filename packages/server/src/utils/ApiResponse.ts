import { ApiStatus, withError } from "./ApiStatus";

interface ResponseError {
  isError: boolean;
  message?: string;
}

export default class ApiResponse<T> {
  public readonly error: ResponseError;
  public readonly status: number;
  public readonly data: T;

  public constructor(status: number, data: T, error?: Error) {
    this.status = status;
    this.data = data;
    this.error = { isError: false };

    if (error) {
      this.error = {
        isError: true,
        message: error.message
      };
    }
  }
}

export function withResponse(status: ApiStatus): ApiResponse<null>;

export function withResponse(
  status: ApiStatus,
  error: Error
): ApiResponse<null>;

export function withResponse<T>(status: ApiStatus, data: T): ApiResponse<T>;

export function withResponse<T>(status: ApiStatus, dataOrError?: T | Error) {
  if (dataOrError instanceof Error) {
    return new ApiResponse(status, null, dataOrError);
  } else if (!dataOrError) {
    return new ApiResponse(status, null, withError(status));
  }
  return new ApiResponse(status, dataOrError);
}
