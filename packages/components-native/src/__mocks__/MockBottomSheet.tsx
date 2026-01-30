/**
 * Mock implementation for @gorhom/bottom-sheet
 * Provides state management and proper rendering for testing
 */
import {
  Fragment,
  type PropsWithChildren,
  type ReactNode,
  type Ref,
  createContext,
  createElement,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { View } from "react-native";
import type {
  BottomSheetModalProps,
  BottomSheetProps,
  BottomSheetModal as RNBottomSheetModal,
} from "@gorhom/bottom-sheet";
import type RNBottomSheet from "@gorhom/bottom-sheet";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};
const NOOP_VALUE = { value: 0, set: NOOP, get: () => 0 };
const BottomSheetModalContext = createContext<null>(null);
export const BottomSheetBackdrop = NOOP;

export function BottomSheetModalProvider({ children }: PropsWithChildren) {
  return createElement(
    BottomSheetModalContext.Provider,
    { value: null },
    children,
  );
}

export function BottomSheetView({ children }: PropsWithChildren) {
  return createElement(View, { testID: "bottom-sheet-view" }, children);
}

const BottomSheet = forwardRef(function MockedBottomSheet(
  {
    children,
    footerComponent,
    onChange,
    index: initialIndex = -1,
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
      style: isOpen ? undefined : { display: "none" },
    },
    [
      createElement(Fragment, { key: "children" }, children),
      footerComponent &&
        createElement(
          Fragment,
          { key: "footer" },
          createElement(footerComponent),
        ),
    ].filter(Boolean),
  );
});

export const BottomSheetModal = forwardRef(function MockedBottomSheetModal(
  { children, onChange, onDismiss }: BottomSheetModalProps,
  ref: Ref<RNBottomSheetModal>,
) {
  const [isPresented, setIsPresented] = useState(false);

  useImperativeHandle(ref, () => ({
    present: () => {
      setIsPresented(true);
      onChange?.(0, 0, 0);
    },
    dismiss: () => {
      setIsPresented(false);
      onChange?.(-1, 0, 0);
      onDismiss?.();
    },
    snapToIndex: (index: number) => {
      if (index >= 0) {
        setIsPresented(true);
      } else {
        setIsPresented(false);
      }
      onChange?.(index, 0, 0);
    },
    snapToPosition: NOOP,
    expand: () => {
      setIsPresented(true);
      onChange?.(0, 0, 0);
    },
    collapse: NOOP,
    close: () => {
      setIsPresented(false);
      onChange?.(-1, 0, 0);
      onDismiss?.();
    },
    forceClose: () => {
      setIsPresented(false);
      onChange?.(-1, 0, 0);
      onDismiss?.();
    },
  }));

  return createElement(
    View,
    {
      testID: "bottom-sheet-modal-mock",
      style: isPresented ? undefined : { display: "none" },
    },
    [
      createElement(Fragment, { key: "children" }, children as ReactNode),
    ].filter(Boolean),
  );
});

// eslint-disable-next-line import/no-default-export
export default BottomSheet;

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

export const useBottomSheetModal = () => ({
  dismiss: NOOP,
  dismissAll: NOOP,
});

// Constants needed for createBottomSheetScrollableComponent
export const SCROLLABLE_TYPE = {
  SCROLLVIEW: "ScrollView",
  FLATLIST: "FlatList",
  SECTIONLIST: "SectionList",
  VIRTUALIZED_LIST: "VirtualizedList",
} as const;

// Mock createBottomSheetScrollableComponent - returns a component that just renders children
export const createBottomSheetScrollableComponent = <T, P>(
  _type: string,
  ScrollableComponent: React.ComponentType<P>,
) => {
  // @ts-expect-error - mock implementation, exact types not critical
  return forwardRef(function MockScrollableComponent(
    props: P & { readonly children?: ReactNode },
    ref: Ref<T>,
  ) {
    // @ts-expect-error - passing ref through to underlying component
    return createElement(ScrollableComponent, { ...props, ref } as P);
  });
};
