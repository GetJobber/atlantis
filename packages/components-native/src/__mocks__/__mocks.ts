// eslint-disable-next-line import/no-internal-modules
import mockRNLocalize from "react-native-localize/mock";

jest.mock("react-native-localize", () => ({
  ...mockRNLocalize,
  getTimeZone: () => "UTC",
}));
