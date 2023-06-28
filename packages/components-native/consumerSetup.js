// Not used right now but something like this may be needed
jest.mock("react-native-localize", () => {
  const mockRNLocalize = jest.requireActual("react-native-localize");
  return {
    ...mockRNLocalize,
    getTimeZone: () => "UTC",
  };
});
