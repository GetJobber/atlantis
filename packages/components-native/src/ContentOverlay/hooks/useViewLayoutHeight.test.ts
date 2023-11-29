import { act, renderHook } from "@testing-library/react-hooks";
import { LayoutChangeEvent } from "react-native";
import { useViewLayoutHeight } from "./useViewLayoutHeight";

describe("useViewLayoutHeight", () => {
  it("should return initial values", async () => {
    const { result } = renderHook(() => useViewLayoutHeight());
    expect(result.current.height).toBe(0);
    expect(result.current.heightKnown).toBe(false);
    expect(typeof result.current.handleLayout).toBe("function");
  });
  it("should handle layout change event", async () => {
    const expectedHeight = 100;
    const layoutChangeEvent: LayoutChangeEvent = {
      nativeEvent: {
        layout: {
          height: expectedHeight,
          width: 100,
          x: 0,
          y: 0,
        },
      },
      currentTarget: 0,
      target: 0,
      bubbles: false,
      cancelable: false,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      preventDefault: function (): void {
        throw new Error("Function not implemented.");
      },
      isDefaultPrevented: function (): boolean {
        throw new Error("Function not implemented.");
      },
      stopPropagation: function (): void {
        throw new Error("Function not implemented.");
      },
      isPropagationStopped: function (): boolean {
        throw new Error("Function not implemented.");
      },
      persist: function (): void {
        throw new Error("Function not implemented.");
      },
      timeStamp: 0,
      type: "",
    };
    const { result } = renderHook(() => useViewLayoutHeight());
    await act(async () => {
      result.current.handleLayout(layoutChangeEvent);
    });

    expect(result.current.height).toBe(expectedHeight);
    expect(result.current.heightKnown).toBe(true);
  });
});
