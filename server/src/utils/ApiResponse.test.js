import ApiResponse, { withResponse } from "./ApiResponse";

describe("ApiResponse", () => {
  it("returns a response with input data", () => {
    expect(withResponse(200, "Ok")).toStrictEqual(new ApiResponse(200, "Ok"));
  });

  it("returns a response with input error", () => {
    expect(withResponse(404, new Error("Not Found"))).toStrictEqual(
      new ApiResponse(404, null, new Error("Not Found"))
    );
  });

  it("returns a response with error from status code", () => {
    expect(withResponse(400)).toStrictEqual(
      new ApiResponse(400, null, new Error("Bad Request"))
    );
  });
});
