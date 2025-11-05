/**
 * Mock implementation for @gorhom/bottom-sheet
 * Provides state management and proper rendering for testing
 */
const {
  forwardRef,
  useImperativeHandle,
  useState,
  createElement,
  Fragment,
} = require("react");
const { View } = require("react-native");
const RN = require("react-native");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BottomSheetFooter = ({ children, ...props }: any) => {
  return createElement(
    View,
    { testID: "bottom-sheet-footer", ...props },
    children,
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const BottomSheetBackdrop = (_props: any) => {
  return createElement(Fragment, {}, null);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BottomSheetView = ({ children, ...props }: any) => {
  return createElement(
    View,
    { testID: "bottom-sheet-view", ...props },
    children,
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const BottomSheet = forwardRef(function MockedBottomSheet(
  {
    children,
    footerComponent,
    backdropComponent,
    onChange,
    index: initialIndex = -1,
    ...props
  }: any,
  ref: any,
) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useImperativeHandle(ref, () => ({
    snapToIndex: (index: number) => {
      setCurrentIndex(index);
      onChange?.(index, 0, 0);
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    snapToPosition: () => {},
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
      ...props,
    },
    [
      backdropComponent &&
        createElement(
          Fragment,
          { key: "backdrop" },
          typeof backdropComponent === "function"
            ? backdropComponent({})
            : backdropComponent,
        ),
      createElement(Fragment, { key: "children" }, children),
      footerComponent &&
        createElement(
          Fragment,
          { key: "footer" },
          typeof footerComponent === "function"
            ? footerComponent({})
            : footerComponent,
        ),
    ].filter(Boolean),
  );
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};
const NOOP_VALUE = { value: 0, set: NOOP, get: () => 0 };

const mockExports = {
  __esModule: true,
  default: BottomSheet,
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetFooter,
  BottomSheetTextInput: RN.TextInput,
  useBottomSheet: () => ({
    snapToIndex: NOOP,
    snapToPosition: NOOP,
    expand: NOOP,
    collapse: NOOP,
    close: NOOP,
    forceClose: NOOP,
    animatedIndex: NOOP_VALUE,
    animatedPosition: NOOP_VALUE,
  }),
  useBottomSheetInternal: () => ({
    animatedKeyboardState: NOOP_VALUE,
    textInputNodesRef: { current: new Set() },
  }),
};

// @ts-expect-error - CommonJS module export for Jest mock
module.exports = mockExports;
