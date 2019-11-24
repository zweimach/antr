import { RuleSetRule } from "webpack";

import babelConfig from "./babelConfig";

export const babelLoader: RuleSetRule = {
  test: /\.(js|ts)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: babelConfig
  }
};

export const eslintLoader: RuleSetRule = {
  test: /\.(js|ts)$/,
  exclude: /node_modules/,
  enforce: "pre",
  loader: "eslint-loader"
};
