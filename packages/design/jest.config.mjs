export default {
  clearMocks: true,
  coverageDirectory: "coverage",

  displayName: "Atlantis Web",
  rootDir: ".",
  preset: "ts-jest",

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "react-markdown":
      "<rootDir>/node_modules/react-markdown/react-markdown.min.js",
    "^@jobber/hooks/(.*)$": "<rootDir>/packages/hooks/dist/$1",
    "^@jobber/components/(.*)$": "<rootDir>/packages/components/src/$1",
  },

  // The test environment that will be used for testing
  testEnvironment: "jest-environment-jsdom",

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["/node_modules/"],
  // If you're using ECMAScript modules, you might need the following configuration
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
      },
    ],
    "^.+\\.(js|jsx)$": "babel-jest", // Only needed if you're using Babel for JavaScript files
  },
  // Specify file extensions
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
