import type { RefObject } from "react";
import { useCallback, useRef } from "react";
import type { View } from "react-native";
import type { KeyboardAwareScrollViewRef } from "react-native-keyboard-controller";

interface UseFormViewRefsReturn {
  readonly scrollViewRef: RefObject<KeyboardAwareScrollViewRef | null>;
  readonly bottomViewRef: RefObject<View | null>;
  readonly scrollToTop: () => void;
}

export function useFormViewRefs(): UseFormViewRefsReturn {
  const scrollViewRef = useRef<KeyboardAwareScrollViewRef>(null);
  const bottomViewRef = useRef<View>(null);
  const scrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, [scrollViewRef]);

  return {
    scrollViewRef: scrollViewRef,
    bottomViewRef,
    scrollToTop,
  };
}
