import { act, renderHook } from "@testing-library/react-native";
import type { KeyboardEvent } from "react-native";
import { DeviceEventEmitter } from "react-native";
import { useKeyboardVisibility } from "./useKeyboardVisibility";

const keyboardEvent: Partial<KeyboardEvent> = {
  endCoordinates: { height: 350, screenX: 120, screenY: 120, width: 200 },
};

describe("when the user is typing", () => {
  it("sets the isKeyboardVisible to true", async () => {
    const { result } = renderHook(() => useKeyboardVisibility());

    await act(async () => {
      DeviceEventEmitter.emit("keyboardDidShow", keyboardEvent);
    });

    expect(result.current.isKeyboardVisible).toBe(true);
  });
  it("the keyboardDidShow event emits the keyboard height", async () => {
    const { result } = renderHook(() => useKeyboardVisibility());

    await act(async () => {
      DeviceEventEmitter.emit("keyboardDidShow", keyboardEvent);
    });

    expect(result.current.keyboardHeight).toBe(
      keyboardEvent.endCoordinates?.height,
    );
  });
});

describe("when the user not typing", () => {
  it("sets the isKeyboardVisible to false", async () => {
    const { result } = renderHook(() => useKeyboardVisibility());

    await act(async () => {
      DeviceEventEmitter.emit("keyboardDidHide");
    });

    expect(result.current.isKeyboardVisible).toBe(false);
  });
});
