import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import dotenv from "dotenv";

import createConfig from "./createServerConfig";
import Server from "../server/src/Server";

dotenv.config();

const compiler = webpack(createConfig(true));

const developmentServer = new Server(
  webpackDevMiddleware(compiler, {
    logLevel: "silent",
    publicPath: "",
    watchOptions: {
      aggregateTimeout: 2000,
    },
  })
);

const port = parseInt(process.env.SERVER_PORT);

developmentServer.start(port);
