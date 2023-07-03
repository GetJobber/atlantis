// Not used right now but something like this may be needed
// jest.mock("react-native-localize", () => {
//   const mockRNLocalize = jest.requireActual("react-native-localize");
//   return {
//     ...mockRNLocalize,
//     getTimeZone: () => "UTC",
//   };
// });

require("react-native-reanimated/lib/reanimated2/jestUtils").setUpTests();

// jest.mock("react-native-reanimated", () => {
//   const reanimated = require("react-native-reanimated/mock");
//   const timing = () => ({ start: () => undefined });
//   return {
//     ...reanimated,
//     default: {
//       ...reanimated.default,
//       timing,
//       // The mock for `call` immediately calls the callback which is incorrect
//       // So we override it with a no-op
//       call: () => undefined,
//     },
//     timing,
//     FadeIn: {
//       duration: () => undefined,
//     },
//   };
// });
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock"),
);

// jest.mock("react-native-uuid", () => {
//   let count = 0;
//   const finalSection = 426655440000;

//   function fakeUUID() {
//     count += 1;
//     return `123e4567-e89b-12d3-a456-${finalSection + count}`;
//   }
//   return { v1: fakeUUID, v4: fakeUUID };
// });
