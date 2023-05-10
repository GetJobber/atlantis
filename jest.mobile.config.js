/** @type {import('jest').Config} */
module.exports = {
  displayName: "Atlantis Mobile",
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  rootDir: "./packages/components-native",
  testPathIgnorePatterns: ["/node_modules/"],
  testMatch: ["<rootDir>/**/*.test.tsx", "**/*.test.ts"],
  clearMocks: true,
};
