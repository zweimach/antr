import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader",
};

export const eslintLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  enforce: "pre",
  loader: "eslint-loader",
};

export const cssLoader = isDevelopment => ({
  test: /\.css$/,
  exclude: /node_modules/,
  oneOf: [
    {
      test: /\.module\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDevelopment,
          },
        },
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            sourceMap: true,
            localsConvention: "camelCase",
            modules: {
              mode: "local",
              localIdentName: "[name]__[local]--[hash:base64:5]",
            },
          },
        },
        "postcss-loader",
      ],
    },
    {
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDevelopment,
          },
        },
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            sourceMap: true,
          },
        },
        "postcss-loader",
      ],
    },
  ],
});

export const fileLoader = {
  test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)/,
  exclude: /node_modules/,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: 8192,
      },
    },
  ],
};
