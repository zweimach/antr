import { withError, ApiStatus } from "./ApiStatus";

describe("ApiStatus", () => {
  it("returns appropriate error", () => {
    expect(withError(ApiStatus.BadRequest)).toStrictEqual(
      new Error("Bad Request")
    );
    expect(withError(ApiStatus.Forbidden)).toStrictEqual(
      new Error("Forbidden")
    );
    expect(withError(ApiStatus.NotFound)).toStrictEqual(new Error("Not Found"));
    expect(withError(ApiStatus.InternalServerError)).toStrictEqual(
      new Error("Internal Server Error")
    );
    expect(withError(ApiStatus.NotImplemented)).toStrictEqual(
      new Error("Not Implemented")
    );
  });

  it("throws on valid status code", () => {
    expect(() => withError(ApiStatus.Accepted)).toThrow();
    expect(() => withError(ApiStatus.Created)).toThrow();
    expect(() => withError(ApiStatus.Ok)).toThrow();
  });
});
