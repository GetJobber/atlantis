/** @type {import('jest').Config} */
module.exports = {
  displayName: "Atlantis Mobile",
  preset: "react-native",
  setupFilesAfterEnv: [
    "./jestMobileSetupConfig.js",
    "./node_modules/react-native-gesture-handler/jestSetup.js",
    "./src/__mocks__/__mocks.ts",
  ],
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-native)",
  ],
  testMatch: ["**/*.test.tsx", "**/*.test.ts"],
  clearMocks: true,
  globalSetup: "./jestNativeSetup.ts",
};
