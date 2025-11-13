/**
 * Mock implementation for @gorhom/bottom-sheet
 * Provides state management and proper rendering for testing
 */
import {
  Fragment,
  type Ref,
  createElement,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { TextInput, View } from "react-native";
import type { BottomSheetProps } from "@gorhom/bottom-sheet";
import type RNBottomSheet from "@gorhom/bottom-sheet";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};
const NOOP_VALUE = { value: 0, set: NOOP, get: () => 0 };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BottomSheetFooter = ({ children, ...props }: any) => {
  return createElement(
    View,
    { testID: "bottom-sheet-footer", ...props },
    children,
  );
};

const BottomSheetBackdrop = NOOP;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BottomSheetView = ({ children, ...props }: any) => {
  return createElement(
    View,
    { testID: "bottom-sheet-view", ...props },
    children,
  );
};

const BottomSheet = forwardRef(function MockedBottomSheet(
  {
    children,
    footerComponent,
    onChange,
    index: initialIndex = -1,
    ...props
  }: BottomSheetProps,
  ref: Ref<RNBottomSheet>,
) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useImperativeHandle(ref, () => ({
    snapToIndex: (index: number) => {
      setCurrentIndex(index);
      onChange?.(index, 0, 0);
    },
    snapToPosition: NOOP,
    expand: () => {
      setCurrentIndex(0);
      onChange?.(0, 0, 0);
    },
    collapse: () => {
      setCurrentIndex(-1);
      onChange?.(-1, 0, 0);
    },
    close: () => {
      setCurrentIndex(-1);
      onChange?.(-1, 0, 0);
    },
    forceClose: () => {
      setCurrentIndex(-1);
      onChange?.(-1, 0, 0);
    },
  }));

  // Always render to maintain hook order, but hide when closed
  const isOpen = currentIndex >= 0;

  return createElement(
    View,
    {
      testID: "bottom-sheet-mock",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style: (isOpen ? undefined : { display: "none" }) as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(props as any),
    },
    [
      createElement(Fragment, { key: "children" }, children),
      footerComponent &&
        createElement(
          Fragment,
          { key: "footer" },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          footerComponent({} as any),
        ),
    ].filter(Boolean),
  );
});

// eslint-disable-next-line import/no-default-export
export default BottomSheet;
export { BottomSheet, BottomSheetBackdrop, BottomSheetView, BottomSheetFooter };

export const BottomSheetTextInput = TextInput;

export const useBottomSheet = () => ({
  snapToIndex: NOOP,
  snapToPosition: NOOP,
  expand: NOOP,
  collapse: NOOP,
  close: NOOP,
  forceClose: NOOP,
  animatedIndex: NOOP_VALUE,
  animatedPosition: NOOP_VALUE,
});

export const useBottomSheetInternal = () => ({
  animatedKeyboardState: NOOP_VALUE,
  textInputNodesRef: { current: new Set() },
});
