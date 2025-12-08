import type { MissingTranslationError } from "react-intl";
import * as ReactNative from "react-native";
import React from "react";
import { MockModal } from "./MockModal";

jest.mock("react-native/Libraries/Modal/Modal", () => ({
  default: MockModal,
}));

// NOTE: this is the old way we used to mock reanimated. We actually do not need to mock it anymore.
// To ensure correct test behaviour, please add `jest.unmock("react-native-reanimated")` to your test suite.
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
    useEvent: () => ({ listeners: [] }),
  };
});

export const MOCK_INTL_CONFIG = {
  locale: "en-US",
  onError: (error: MissingTranslationError): void => {
    if (error.code === "MISSING_TRANSLATION") {
      return;
    }
    throw error;
  },
};

jest.mock("react-intl", () => {
  const reactIntl = jest.requireActual("react-intl");
  const intl = reactIntl.createIntl(MOCK_INTL_CONFIG);

  return {
    ...reactIntl,
    useIntl: () => intl,
  };
});

jest.mock("../hooks/useIsScreenReaderEnabled", () => ({
  useIsScreenReaderEnabled: () => false,
}));

// By default React Native mocks the return value of `addEventListener` using
// jest.fn(). See https://github.com/facebook/react-native/blob/0.69-stable/jest/setup.js#L124
// This provides an implementation of .remove for useEffect's that do subscribe and
// call .remove on tear down.
jest.spyOn(ReactNative.AccessibilityInfo, "addEventListener").mockReturnValue({
  remove: jest.fn(),
} as unknown as ReactNative.EmitterSubscription);

jest.doMock("react-native", () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      findNodeHandle: () => {
        return 1;
      },
    },
    ReactNative,
  );
});

// mockRef is needed to properly use our Form component in tests.
// @ts-expect-error tsc-ci
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const KeyboardAwareScrollView = ({ children }, _ref) => children;
const mockRef = React.forwardRef(KeyboardAwareScrollView);
jest.mock("react-native-keyboard-aware-scroll-view", () => {
  return { KeyboardAwareScrollView: mockRef };
});

// NOTE: mocking bottom-sheet entirely is not necessary. To ensure correct test behaviour, please add
// `jest.unmock("@gorhom/bottom-sheet")` to your test suite. You do need to mock a single function
// (isFabricInstalled) due to a bug in this library. See ContentOverlay.test.tsx for a complete example.
// jest.mock(
//   "@gorhom/bottom-sheet/lib/commonjs/utilities/isFabricInstalled",
//   () => ({
//     // Fix to avoid this error: ref.current.unstable_getBoundingClientRect is not a function
//     // https://github.com/gorhom/react-native-bottom-sheet/issues/2581
//     isFabricInstalled: () => false,
//   }),
// );
jest.mock("@gorhom/bottom-sheet", () => require("./MockBottomSheet"));
