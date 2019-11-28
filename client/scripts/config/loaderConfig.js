export const babelLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: "babel-loader"
};

export const eslintLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  enforce: "pre",
  loader: "eslint-loader"
};

export const postcssLoader = {
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
      loader: "postcss-loader"
    }
  ]
};

export const fileLoader = {
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
