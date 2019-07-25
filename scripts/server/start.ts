import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

import createConfig from "./config/createConfig";
import Server from "../../packages/server/src/Server";

const compiler = webpack(createConfig(true));

const devServer = new Server(
  webpackDevMiddleware(compiler, {
    logLevel: "silent",
    publicPath: "",
    watchOptions: {
      aggregateTimeout: 2000
    }
  })
);

devServer.start();
