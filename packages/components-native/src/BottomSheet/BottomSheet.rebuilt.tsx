import type { ReactNode, Ref } from "react";
import React, { forwardRef, useCallback } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { useStyles } from "./BottomSheet.rebuilt.style";

export interface BottomSheetProps {
  readonly children: ReactNode;

  /**
   * Display a cancel button in the bottom sheet footer.
   */
  readonly showCancel?: boolean;

  /**
   * Hide or show the cancel button when loading state is provided.
   */
  readonly loading?: boolean;

  /**
   * An optional heading to display in the bottom sheet header.
   */
  readonly heading?: string;

  /**
   * Callback that is called when the overlay is opened.
   */
  readonly onOpen?: () => void;

  /**
   * Callback that is called when the overlay is closed.
   */
  readonly onClose?: () => void;
}

export const BottomSheetRebuilt = forwardRef(BottomSheetRebuiltInternal);
export type BottomSheetRebuiltRef = BottomSheet;

function BottomSheetRebuiltInternal(
  props: BottomSheetProps,
  ref: Ref<BottomSheetRebuiltRef>,
) {
  const styles = useStyles();

  const renderBackdrop = useCallback(
    (bottomSheetBackdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...bottomSheetBackdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      style={styles.modal}
      // backgroundStyle={styles.overlay}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.children}>
        {props.children}
      </BottomSheetView>
    </BottomSheet>
  );
}
