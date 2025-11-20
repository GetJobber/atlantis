/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect } from "react";

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

export const BottomSheetBackdrop = props => props.children || null;

export const BottomSheetFooter = ({ children }) => children;

export const BottomSheetView = ({ children }) => children;

export const useBottomSheetInternal = () => ({
  animatedKeyboardState: {
    get: () => ({ target: undefined }),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    set: () => {},
  },
  textInputNodesRef: { current: new Set() },
});

export default BottomSheet;
