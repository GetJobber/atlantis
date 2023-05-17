/* eslint-disable import/no-internal-modules */
import mockRNLocalize from "react-native-localize/mock";

jest.mock("react-native-localize", () => ({
  ...mockRNLocalize,
  getTimeZone: () => "UTC",
}));

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
