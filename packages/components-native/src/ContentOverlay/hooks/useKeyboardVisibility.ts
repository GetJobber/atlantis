import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

interface KeyboardVisibility {
  readonly isKeyboardVisible: boolean;
  readonly keyboardHeight: number;
}

export function useKeyboardVisibility(): KeyboardVisibility {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event: KeyboardEvent) => {
        setKeyboardVisible(true);
        setKeyboardHeight(event.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return { isKeyboardVisible, keyboardHeight };
}
