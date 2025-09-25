/** @type {import('jest').Config} */
module.exports = {
  displayName: "Atlantis Mobile",
  preset: "react-native",
  setupFiles: [
    "../../node_modules/react-native-gesture-handler/jestSetup.js",
    "./jestSafeAreaContext.js",
  ],
  setupFilesAfterEnv: [
    "./jestMobileSetupConfig.js",
    "./src/__mocks__/__mocks.ts",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/node_modules.e2e/"],
  modulePathIgnorePatterns: ["/node_modules.e2e/"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-native)",
    "/node_modules.e2e/",
  ],
  testMatch: ["**/*.test.tsx", "**/*.test.ts"],
  clearMocks: true,
  globalSetup: "./jestNativeSetup.ts",
};
