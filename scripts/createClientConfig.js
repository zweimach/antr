import HtmlWebpackPlugin from "html-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import DotenvWebpackPlugin from "dotenv-webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";

import {
  babelLoader,
  eslintLoader,
  fileLoader,
  cssLoader,
} from "./loaderConfig";
import { clientDirectory, buildDirectory } from "./getDirectoryPath";

function getPlugins(isDevelopment) {
  const plugins = [
    new HtmlWebpackPlugin({
      template: path.join(clientDirectory, "public", "index.html"),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new FriendlyErrorsWebpackPlugin(),
    new DotenvWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment
        ? "[name].[hash].css"
        : "[name].[contenthash].css",
    }),
  ];

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
      rules: [eslintLoader, babelLoader, cssLoader(isDevelopment), fileLoader],
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
      minimizer: [new TerserWebpackPlugin(), new OptimizeCSSAssetsPlugin()],
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
