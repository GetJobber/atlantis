import { renderHook } from "@testing-library/react";
import { useOnMount } from "./useOnMount";

describe("useOnMount", () => {
  it("should call the function on mount", () => {
    const fn = jest.fn();
    renderHook(() => useOnMount(fn));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should only call function once when re-rendered", () => {
    const fn = jest.fn();
    const view = renderHook(() => useOnMount(fn));

    expect(fn).toHaveBeenCalledTimes(1);

    view.rerender();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
