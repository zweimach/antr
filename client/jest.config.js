module.exports = {
  displayName: "client",
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.js",
    "<rootDir>/src/**/?(*.)(spec|test).js",
  ],
  moduleNameMapper: {
    "^.+\\.css$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.js$": "babel-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "jest-transform-stub",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.js$", "^.+\\.css$"],
  collectCoverageFrom: ["<rootDir>/src/**/*.js"],
};
