module.exports = {
  env: {
    browser: true,
    node: false
  },
  extends: [
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier/react"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react", "react-hooks", "jsx-a11y"],
  settings: {
    react: {
      version: "latest"
    }
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  overrides: [
    {
      files: ["scripts/**/*.js"],
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
