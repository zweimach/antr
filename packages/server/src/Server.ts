import express from "express";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";

import startDatabase from "./database";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";

export default class Server {
  private readonly server: express.Express;
  private readonly middleware: express.RequestHandler[];

  public constructor(...middleware: express.RequestHandler[]) {
    this.middleware = middleware;
    this.server = express();
  }

  public async start(port = 4000) {
    await startDatabase();

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const apolloServer = new ApolloServer({ schema });

    apolloServer.applyMiddleware({ app: this.server });

    if (this.middleware.length > 0) {
      this.server.use(this.middleware);
    }

    this.server.listen({ port });
  }
}
