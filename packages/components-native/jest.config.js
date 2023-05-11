/** @type {import('jest').Config} */
module.exports = {
  displayName: "Atlantis Mobile",
  preset: "react-native",
  setupFilesAfterEnv: ["./jestMobileSetupConfig.js"],
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-native)",
  ],
  reporters: [
    "default",
    ["jest-junit", { suiteName: "Atlantis Mobile jest tests" }],
  ],
  testMatch: ["**/*.test.tsx", "**/*.test.ts"],
  clearMocks: true,
};
