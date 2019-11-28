module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  extends: ["eslint:recommended", "prettier"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["prettier"],
  rules: {},
  overrides: [
    {
      files: ["*.test.{js,jsx}", "*.spec.{js,jsx}"],
      extends: ["plugin:jest/recommended"],
      plugins: ["jest"]
    }
  ]
};
