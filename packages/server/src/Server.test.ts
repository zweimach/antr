import Server from "./Server";

describe("Server", () => {
  let server: Server;

  beforeAll(() => {
    server = new Server();
  });

  it("Can be constructed", () => {
    expect(server).toBeInstanceOf(Server);
  });
});
