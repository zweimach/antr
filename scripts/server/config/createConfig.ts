import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin-alt";
import path from "path";

import { babelLoader, eslintLoader } from "./loaderConfig";
import { buildDir, packagesDir } from "../../utils/getDirPath";

export default function createConfig(isDevelopment: boolean): Configuration {
  return {
    mode: isDevelopment ? "development" : "production",
    target: "node",
    devtool: isDevelopment ? "inline-source-map" : undefined,
    entry: `${packagesDir}/server/src/index.ts`,
    externals: [
      nodeExternals({
        modulesDir: path.join(packagesDir, "server", "node_modules")
      })
    ],
    module: {
      rules: [eslintLoader, babelLoader]
    },
    resolve: {
      extensions: ["*", ".js", ".ts", ".json"]
    },
    output: {
      filename: "index.js",
      path: path.join(buildDir, "server")
    },
    watch: isDevelopment,
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin({ silent: true })
    ]
  };
}
