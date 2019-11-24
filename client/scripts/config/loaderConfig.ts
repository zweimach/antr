import { RuleSetRule } from "webpack";

import babelConfig from "./babelConfig";

export const babelLoader: RuleSetRule = {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: babelConfig
  }
};

export const eslintLoader: RuleSetRule = {
  test: /\.(js|jsx|ts|tsx)$/,
  exclude: /node_modules/,
  enforce: "pre",
  loader: "eslint-loader"
};

export const postcssLoader: RuleSetRule = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "style-loader"
    },
    {
      loader: "css-loader",
      options: {
        importLoaders: 1,
        localsConvention: "camelCase",
        modules: {
          mode: "local",
          localIdentName: "[name]__[local]--[hash:base64:5]"
        },
        sourceMap: true
      }
    },
    {
      loader: "postcss-loader",
      options: {
        ident: "postcss",
        plugins: [require("postcss-preset-env")(), require("stylelint")()]
      }
    }
  ]
};

export const fileLoader: RuleSetRule = {
  test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)/,
  exclude: /node_modules/,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: 8192
      }
    }
  ]
};
