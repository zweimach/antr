import setupDatabase from "./setupDatabase";

describe("setupDatabase", () => {
  it("should setup the database", async () => {
    expect.assertions(1);
    await expect(
      setupDatabase({ type: "sqljs" }, false)
    ).resolves.not.toThrow();
  });
});
