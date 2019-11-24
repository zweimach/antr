import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import createConfig from "./config/createConfig";

const compiler = webpack(createConfig(true));

const devServer = new WebpackDevServer(compiler, {
  publicPath: "",
  quiet: true,
  watchOptions: {
    aggregateTimeout: 500
  },
  useLocalIp: true
});

devServer.listen(3000, "0.0.0.0");
