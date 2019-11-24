import { Configuration, Plugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin-alt";
import TerserWebpackPlugin from "terser-webpack-plugin";
import DotenvWebpackPlugin from "dotenv-webpack";
import path from "path";

import {
  babelLoader,
  eslintLoader,
  fileLoader,
  postcssLoader
} from "./loaderConfig";
import { packagesDir, buildDir } from "./getDirPath";

function getPlugins(isDevelopment: boolean): Plugin[] {
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.join(packagesDir, "public", "index.html"),
      filename: "index.html"
    }),
    new FriendlyErrorsWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({ silent: true }),
    new DotenvWebpackPlugin()
  ];

  if (!isDevelopment) {
    plugins.push(new TerserWebpackPlugin());
  }

  return plugins;
}

export default function createConfig(isDevelopment: boolean): Configuration {
  return {
    mode: isDevelopment ? "development" : "production",
    target: "web",
    devtool: isDevelopment ? "inline-source-map" : undefined,
    entry: path.join(packagesDir, "src", "index.tsx"),
    module: {
      rules: [eslintLoader, babelLoader, postcssLoader, fileLoader]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".json"]
    },
    output: {
      filename: "bundle.js",
      path: path.join(buildDir, "client")
    },
    watch: isDevelopment,
    plugins: getPlugins(isDevelopment)
  };
}
