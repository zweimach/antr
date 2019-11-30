import HtmlWebpackPlugin from "html-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import DotenvWebpackPlugin from "dotenv-webpack";
import path from "path";

import {
  babelLoader,
  eslintLoader,
  fileLoader,
  postcssLoader,
} from "./loaderConfig";
import { clientDirectory, buildDirectory } from "./getDirectoryPath";

function getPlugins(isDevelopment) {
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.join(clientDirectory, "public", "index.html"),
      filename: "index.html",
      minify: !isDevelopment,
    }),
    new FriendlyErrorsWebpackPlugin(),
    new DotenvWebpackPlugin(),
  ];

  if (!isDevelopment) {
    plugins.push(new TerserWebpackPlugin());
  }

  return plugins;
}

export default function createConfig(isDevelopment) {
  return {
    mode: isDevelopment ? "development" : "production",
    target: "web",
    devtool: isDevelopment ? "inline-source-map" : undefined,
    entry: [
      "react-hot-loader/patch",
      path.join(clientDirectory, "src", "index.js"),
    ],
    module: {
      rules: [eslintLoader, babelLoader, postcssLoader, fileLoader],
    },
    resolve: {
      extensions: [".js", ".json"],
      alias: isDevelopment
        ? { "react-dom": "@hot-loader/react-dom" }
        : undefined,
    },
    output: {
      filename: isDevelopment ? "[name].[hash].js" : "[name].[contenthash].js",
      path: path.join(buildDirectory, "client"),
    },
    watch: isDevelopment,
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    plugins: getPlugins(isDevelopment),
  };
}
