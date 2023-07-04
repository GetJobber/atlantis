// Not used right now but something like this may be needed
// jest.mock("react-native-localize", () => {
//   const mockRNLocalize = jest.requireActual("react-native-localize");
//   return {
//     ...mockRNLocalize,
//     getTimeZone: () => "UTC",
//   };
// });

require("react-native-reanimated/lib/reanimated2/jestUtils").setUpTests();

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// jest.mock("react-native-uuid", () => {
//   let count = 0;
//   const finalSection = 426655440000;

//   function fakeUUID() {
//     count += 1;
//     return `123e4567-e89b-12d3-a456-${finalSection + count}`;
//   }
//   return { v1: fakeUUID, v4: fakeUUID };
// });
