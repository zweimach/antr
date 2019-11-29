module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  extends: [
    "eslint:recommended",
    "plugin:eslint-comments/recommended",
    "plugin:unicorn/recommended",
    "plugin:promise/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/unicorn",
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ["*.test.{js,jsx}", "*.spec.{js,jsx}"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
    },
    {
      files: ["client/**"],
      env: {
        browser: true,
        node: false,
      },
      extends: [
        "plugin:compat/recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier/react",
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ["react-hooks"],
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
    {
      files: ["server/**", "scripts/**"],
      env: {
        browser: false,
        node: true,
      },
      globals: {
        __dirname: "readonly",
        __filename: "readonly",
      },
      extends: ["plugin:node/recommended-module"],
      rules: {
        "node/no-unpublished-import": "off",
      },
    },
  ],
};
