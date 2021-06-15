import { Configuration, configure } from "./configure";

describe("configure", () => {
  const originalNotifier = Configuration.errorNotifier;
  afterEach(() => {
    configure({
      errorNotifier: originalNotifier,
    });
  });

  it("should set the errorNotifier to the passed in configuration option", () => {
    const myNotifier = jest.fn();
    configure({
      errorNotifier: myNotifier,
    });

    expect(Configuration.errorNotifier).toBe(myNotifier);
  });
});
