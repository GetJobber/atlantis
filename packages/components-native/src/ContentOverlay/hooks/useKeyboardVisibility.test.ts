import { act, renderHook } from "@testing-library/react-hooks";
import { DeviceEventEmitter, KeyboardEvent } from "react-native";
import { useKeyboardVisibility } from "./useKeyboardVisibility";

const keyboardEvent: Partial<KeyboardEvent> = {
  endCoordinates: { height: 350, screenX: 120, screenY: 120, width: 200 },
};

describe("when the user is typing", () => {
  it("sets the isKeyboardVisible to true", () => {
    const { result } = renderHook(() => useKeyboardVisibility());

    act(() => {
      DeviceEventEmitter.emit("keyboardDidShow", keyboardEvent);
    });

    expect(result.current.isKeyboardVisible).toBe(true);
  });
  it("the keyboardDidShow event emits the keyboard height", () => {
    const { result } = renderHook(() => useKeyboardVisibility());

    act(() => {
      DeviceEventEmitter.emit("keyboardDidShow", keyboardEvent);
    });

    expect(result.current.keyboardHeight).toBe(
      keyboardEvent.endCoordinates?.height,
    );
  });
});

describe("when the user not typing", () => {
  it("sets the isKeyboardVisible to false", () => {
    const { result } = renderHook(() => useKeyboardVisibility());

    act(() => {
      DeviceEventEmitter.emit("keyboardDidHide");
    });

    expect(result.current.isKeyboardVisible).toBe(false);
  });
});
