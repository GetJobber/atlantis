import { renderHook } from "@testing-library/react";
import { useCallbackRef } from ".";

describe("useCallbackRef", () => {
  it("should replace function when a new one is provided", () => {
    const callbackInitial = jest.fn();
    const callbackReplaced = jest.fn();
    const { rerender, result } = renderHook(useCallbackRef, {
      initialProps: callbackInitial,
    });

    result.current("my args");

    expect(callbackInitial).toHaveBeenCalledWith("my args");

    rerender(callbackReplaced);
    result.current("my updated args");

    expect(callbackReplaced).toHaveBeenCalledWith("my updated args");
  });

  it("should not run function when it's undefined", () => {
    const callbackInitial = jest.fn();
    const { rerender, result } = renderHook(useCallbackRef, {
      initialProps: callbackInitial,
    });

    result.current("my args");

    expect(callbackInitial).toHaveBeenCalledWith("my args");

    rerender(undefined);
    result.current("my updated args");

    expect(callbackInitial).toHaveBeenCalledTimes(1);
  });
});
