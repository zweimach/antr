module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
  ],
  overrides: [
    {
      test: ["client/**/*.js"],
      presets: ["@babel/preset-react"],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "react-hot-loader/babel",
      ],
    },
    {
      test: ["server/**/*.js"],
      presets: [["@babel/preset-env", { targets: { node: true } }]],
      plugins: [
        "babel-plugin-transform-typescript-metadata",
        [
          "@babel/plugin-transform-regenerator",
          {
            asyncGenerators: false,
            generators: false,
            async: false,
          },
        ],
      ],
    },
  ],
};
