import express from "express";

import startDatabase from "./database";
import {
  counterRoutes,
  queueRoutes,
  serviceRoutes,
  userRoutes,
  setupRoutes
} from "./routes";

export default class Server {
  private readonly server: express.Express;
  private readonly middleware: express.RequestHandler[];

  public constructor(...middleware: express.RequestHandler[]) {
    this.middleware = middleware;
    this.server = express();
  }

  public async start(port = 4000) {
    await startDatabase();
    setupRoutes();

    if (this.middleware.length > 0) {
      this.server.use(this.middleware);
    }

    this.server.use(
      "/api",
      counterRoutes,
      queueRoutes,
      serviceRoutes,
      userRoutes
    );

    this.server.listen({ port });
  }
}
