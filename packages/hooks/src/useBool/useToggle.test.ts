import { act, renderHook } from "@testing-library/react";
import { useToggle } from "./useToggle";

describe("useToggle, a hook for managing boolean state", () => {
  it("by default has an initial state that is `false`", () => {
    const [value] = renderHook(() => useToggle()).result.current;

    expect(value).toBe(false);
  });

  it("can be provided an initial state", () => {
    const [value] = renderHook(() => useToggle(true)).result.current;

    expect(value).toBe(true);
  });

  it("provides a method to toggle the state value", () => {
    const { result } = renderHook(() => useToggle());
    const value = () => result.current[0];
    const [, toggle] = result.current;

    expect(value()).toBe(false);
    act(toggle);
    expect(value()).toBe(true);
    act(toggle);
    expect(value()).toBe(false);
  });
});
