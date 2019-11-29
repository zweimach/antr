import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import path from "path";

import createConfig from "./createClientConfig";
import { buildDirectory } from "./getDirectoryPath";

const compiler = webpack(createConfig(true));

const developmentServer = new WebpackDevServer(compiler, {
  contentBase: path.join(buildDirectory, "client"),
  hot: true,
  publicPath: "",
  quiet: true,
  watchOptions: {
    aggregateTimeout: 500,
  },
  useLocalIp: true,
});

developmentServer.listen(3000, "0.0.0.0");
