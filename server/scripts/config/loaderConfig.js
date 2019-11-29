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
