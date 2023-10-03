import { RefObject, useCallback, useRef } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface UseFormViewRefsReturn {
  readonly scrollViewRef: RefObject<KeyboardAwareScrollView>;
  readonly bottomViewRef: RefObject<View>;
  readonly scrollToTop: () => void;
}

export function useFormViewRefs(): UseFormViewRefsReturn {
  const scrollViewRef: RefObject<KeyboardAwareScrollView> =
    useRef<KeyboardAwareScrollView>(null);
  const bottomViewRef: RefObject<View> = useRef<View>(null);
  const scrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollToPosition(0, 0);
  }, [scrollViewRef]);
  return {
    scrollViewRef: scrollViewRef,
    bottomViewRef,
    scrollToTop,
  };
}
