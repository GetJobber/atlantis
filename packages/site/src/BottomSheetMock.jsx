/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

// Mock for @gorhom/bottom-sheet
// eslint-disable-next-line react/display-name
const BottomSheet = forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  const updateOpen = () => {
    setOpen(o => !o);
  };

  useEffect(() => {
    if (ref) {
      ref.current = {
        expand: updateOpen,
        close: () => setOpen(false),
        collapse: () => setOpen(false),
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        snapToIndex: () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        snapToPosition: () => {},
        forceClose: () => setOpen(false),
      };
    }
  }, [ref]);

  return (
    <div style={{ display: open ? "block" : "none" }} ref={ref}>
      {props.children}
    </div>
  );
});

export const BottomSheetModal = forwardRef(function MockedBottomSheetModal(
  { children, onChange, onDismiss },
  ref,
) {
  const [isPresented, setIsPresented] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    present: () => {
      setIsPresented(true);
      onChange?.(0, 0, 0);
    },
    dismiss: () => {
      setIsPresented(false);
      onChange?.(-1, 0, 0);
      onDismiss?.();
    },
    snapToIndex: index => {
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

  if (!isPresented) {
    return null;
  }

  return <div ref={ref}>{children}</div>;
});

export const BottomSheetBackdrop = props => props.children || null;

export const BottomSheetView = ({ children }) => children;

export const BottomSheetScrollView = ({ children }) => children;

export const BottomSheetModalProvider = ({ children }) => children;

export const useBottomSheetInternal = () => ({
  animatedKeyboardState: {
    get: () => ({ target: undefined }),
    set: NOOP,
  },
  textInputNodesRef: { current: new Set() },
});

export default BottomSheet;

export const useBottomSheetModal = () => ({
  dismiss: NOOP,
  dismissAll: NOOP,
});
