import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import startDatabase from "./database";
import {
  counterRoutes,
  queueRoutes,
  serviceRoutes,
  userRoutes,
  setupRoutes,
} from "./routes";

export default class Server {
  constructor(...middleware) {
    this.middleware = middleware;
    this.server = express();
  }

  async start(port = 4000) {
    await startDatabase();
    setupRoutes();

    this.server.use(
      cors(),
      bodyParser.json(),
      bodyParser.urlencoded({ extended: false })
    );

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
