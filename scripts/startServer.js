import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

import createConfig from "./createServerConfig";
import Server from "../server/src/Server";

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

developmentServer.start();
