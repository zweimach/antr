import nodeExternals from "webpack-node-externals";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import path from "path";

import { babelLoader, eslintLoader } from "./loaderConfig";
import { buildDir, serverDir } from "./getDirPath";

export default function createConfig(isDevelopment) {
  return {
    mode: isDevelopment ? "development" : "production",
    target: "node",
    devtool: isDevelopment ? "inline-source-map" : undefined,
    entry: path.join(serverDir, "src", "index.js"),
    externals: [
      nodeExternals({
        modulesDir: path.join(serverDir, "node_modules"),
      }),
    ],
    module: {
      rules: [eslintLoader, babelLoader],
    },
    resolve: {
      extensions: ["*", ".js", ".json"],
    },
    output: {
      filename: "index.js",
      path: path.join(buildDir, "server"),
    },
    watch: isDevelopment,
    plugins: [new FriendlyErrorsWebpackPlugin()],
  };
}
