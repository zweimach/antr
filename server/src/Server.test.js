import Server from "./Server";

describe("Server", () => {
  let server;

  beforeAll(() => {
    server = new Server();
  });

  it("Can be constructed", () => {
    expect(server).toBeInstanceOf(Server);
  });
});
