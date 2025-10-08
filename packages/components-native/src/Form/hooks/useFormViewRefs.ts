import type { RefObject } from "react";
import { useCallback, useRef } from "react";
import type { View } from "react-native";
import type { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface UseFormViewRefsReturn {
  readonly scrollViewRef: RefObject<KeyboardAwareScrollView | null>;
  readonly bottomViewRef: RefObject<View | null>;
  readonly scrollToTop: () => void;
}

export function useFormViewRefs(): UseFormViewRefsReturn {
  const scrollViewRef = useRef<KeyboardAwareScrollView | null>(null);
  const bottomViewRef = useRef<View | null>(null);
  const scrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollToPosition(0, 0);
  }, [scrollViewRef]);

  return {
    scrollViewRef: scrollViewRef,
    bottomViewRef,
    scrollToTop,
  };
}
