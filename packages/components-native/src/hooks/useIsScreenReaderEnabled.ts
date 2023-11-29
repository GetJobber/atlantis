import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

export function useIsScreenReaderEnabled(): boolean {
  const [screenReaderEnabled, setScreenReaderEnabled] =
    useState<boolean>(false);

  useEffect(() => {
    function handleScreenReaderToggle(isScreenReaderEnabled: boolean) {
      setScreenReaderEnabled(isScreenReaderEnabled);
    }

    AccessibilityInfo.isScreenReaderEnabled()
      .then(enabled => {
        setScreenReaderEnabled(enabled);
      })
      .catch(() => {
        setScreenReaderEnabled(false);
      });

    const listener = AccessibilityInfo.addEventListener(
      "screenReaderChanged",
      handleScreenReaderToggle,
    );

    return () => {
      listener.remove();
    };
  }, []);

  return screenReaderEnabled;
}
