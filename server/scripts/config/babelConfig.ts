export default {
  presets: [
    ["@babel/preset-env", { targets: { node: true } }],
    "@babel/preset-typescript"
  ],
  plugins: [
    ["babel-plugin-transform-typescript-metadata"],
    [
      "@babel/plugin-transform-regenerator",
      {
        asyncGenerators: false,
        generators: false,
        async: false
      }
    ],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }]
  ]
};
