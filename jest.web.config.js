/* eslint-env node */
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
/** @type {import('jest').Config} */
module.exports = {
  displayName: "Atlantis Web",
  rootDir: ".",
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "react-markdown":
      "<rootDir>/node_modules/react-markdown/react-markdown.min.js",
    "^@jobber/hooks/(.*)$": "<rootDir>/packages/hooks/dist/$1",
  },
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  setupFilesAfterEnv: ["./jestWebSetupConfig.js"],

  // The test environment that will be used for testing
  testEnvironment: "jest-environment-jsdom",

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/",
    "/packages/generators/templates/",
    "/packages/components-native/",
  ],
  transformIgnorePatterns: ["node_modules/(?!@codesandbox/sandpack-react)/"],
};
