import React from "react";
// Mock the useIsScreenReaderEnabled hook
jest.mock("./dist/src/hooks", () => {
  const actualHooks = jest.requireActual("./dist/src/hooks");

  return { ...actualHooks, useIsScreenReaderEnabled: () => false };
});

jest.mock("./dist/src/Button/components/InternalButtonLoading", () => {
  const ImageBackground = jest.requireActual("react-native");

  return {
    InternalButtonLoading: props => (
      <ImageBackground.ImageBackground {...props} testID="loadingImage" />
    ),
  };
});

require("react-native-reanimated").setUpTests();
