import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import path from "path";

import createConfig from "./config/createConfig";
import { buildDir } from "./config/getDirPath";

const compiler = webpack(createConfig(true));

const devServer = new WebpackDevServer(compiler, {
  contentBase: path.join(buildDir, "client"),
  hot: true,
  publicPath: "",
  quiet: true,
  watchOptions: {
    aggregateTimeout: 500,
  },
  useLocalIp: true,
});

devServer.listen(3000, "0.0.0.0");
