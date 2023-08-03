jest.mock("./dist/src/hooks", () => {
  console.warn("mocking hooks");
  const test = jest.requireActual("./dist/src/hooks");
  return { ...test, useIsScreenReaderEnabled: () => false };
});
