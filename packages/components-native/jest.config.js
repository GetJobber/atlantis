/** @type {import('jest').Config} */
module.exports = {
  displayName: "Atlantis Mobile",
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  // rootDir: ".",
  clearMocks: true,
};
