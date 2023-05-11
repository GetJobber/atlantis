/** @type {import('jest').Config} */
module.exports = {
  displayName: "Atlantis Mobile",
  preset: "react-native",
  setupFilesAfterEnv: ["./jestMobileSetupConfig.js"],
  // rootDir: "./packages/components-native",
  testPathIgnorePatterns: ["/node_modules/"],
  // testMatch: [
  //   "<rootDir>/packages/components-native/**/*.test.tsx",
  //   "<rootDir>/packages/components-native/**/*.test.ts",
  // ],
  clearMocks: true,
};
