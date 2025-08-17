import type { Ref } from "react";
import { mergeRefs } from "./mergeRefs";

describe("mergeRefs", () => {
  it("calls the ref callback with the provided value", () => {
    const ref1 = jest.fn();
    const ref2 = jest.fn();
    const ref3 = jest.fn();
    const value = "test value";

    mergeRefs([ref1, ref2, ref3])(value);

    expect(ref1).toHaveBeenCalledWith(value);
    expect(ref2).toHaveBeenCalledWith(value);
    expect(ref3).toHaveBeenCalledWith(value);
  });

  it("sets the current value of mutable refs", () => {
    const ref1: Ref<string | null> = { current: null };
    const ref2: Ref<string | null> = { current: null };
    const ref3: Ref<string | null> = { current: null };
    const value = "test value";

    mergeRefs([ref1, ref2, ref3])(value);

    expect(ref1.current).toBe(value);
    expect(ref2.current).toBe(value);
    expect(ref3.current).toBe(value);
  });

  it("skips null and undefined refs", () => {
    const ref1 = jest.fn();
    const ref2 = null;
    const ref3 = undefined;
    const value = "test value";

    mergeRefs([ref1, ref2, ref3])(value);

    expect(ref1).toHaveBeenCalledWith(value);
  });
});
