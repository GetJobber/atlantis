import { act, renderHook } from "@testing-library/react";
import { useBool } from "./useBool";

describe("useBool, a hook for managing boolean state", () => {
  it("by default has an initial state that is `false`", () => {
    const [value] = renderHook(() => useBool()).result.current;

    expect(value).toBe(false);
  });

  it("can be provided an initial state", () => {
    const [value] = renderHook(() => useBool(true)).result.current;

    expect(value).toBe(true);
  });

  it("provides helpful setters and a toggle method", () => {
    const { result } = renderHook(() => useBool());
    const value = () => result.current[0];
    const [, setTrue, setFalse, toggle] = result.current;

    expect(value()).toBe(false);
    act(setTrue);
    expect(value()).toBe(true);
    act(setFalse);
    expect(value()).toBe(false);
    act(toggle);
    expect(value()).toBe(true);
    act(toggle);
    expect(value()).toBe(false);
  });
});
