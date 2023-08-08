import React from "react";

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

jest.mock("react-native-reanimated", () => {
  const reanimated = require("react-native-reanimated/mock");
  const timing = () => ({ start: () => undefined });
  return {
    ...reanimated,
    default: {
      ...reanimated.default,
      timing,
      // The mock for `call` immediately calls the callback which is incorrect
      // So we override it with a no-op
      call: () => undefined,
    },
    timing,
    FadeIn: {
      duration: () => undefined,
    },
  };
});

jest.mock("./dist/src/Form", () => {
  const { Form, AtlantisFormContext, ...Actual } =
    jest.requireActual("./dist/src/Form");
  const useConfirmBeforeBack = jest.fn(() => jest.fn());
  const useInternalFormLocalCache = jest.fn(() => ({
    setLocalCache: jest.fn(),
    removeLocalCache: jest.fn(),
  }));
  return {
    ...Actual,
    AtlantisFormContext: AtlantisFormContext,
    // eslint-disable-next-line react/prop-types
    Form: ({ children, ...props }) => {
      return (
        <AtlantisFormContext.Provider
          value={{ useConfirmBeforeBack, useInternalFormLocalCache }}
        >
          <Form {...props}>{children}</Form>
        </AtlantisFormContext.Provider>
      );
    },
  };
});
