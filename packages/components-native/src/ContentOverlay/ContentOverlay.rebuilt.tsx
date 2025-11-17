import React, { useImperativeHandle, useRef } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type {
  BottomSheetBackdropProps,
  BottomSheetModal as BottomSheetModalType,
} from "@gorhom/bottom-sheet";
import type { ContentOverlayRebuiltProps } from "./types";
import { useStyles } from "./ContentOverlay.rebuilt.style";

function ContentOverlayRebuiltInternal({
  children,
  onClose,
  onOpen,
  ref,
}: ContentOverlayRebuiltProps): JSX.Element {
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModalType>(null);
  const previousIndexRef = useRef(-1);
  const styles = useStyles();

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetModalRef.current?.present();
    },
    close: () => {
      bottomSheetModalRef.current?.dismiss();
    },
  }));

  const handleChange = (index: number) => {
    const previousIndex = previousIndexRef.current;

    if (previousIndex === -1 && index >= 0) {
      // Transitioned from closed to open
      onOpen?.();
    } else if (previousIndex >= 0 && index === -1) {
      // Transitioned from open to closed
      onClose?.();
    }

    previousIndexRef.current = index;
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={["50%"]}
      onChange={handleChange}
      backgroundStyle={styles.modal}
      handleStyle={styles.handle}
      backdropComponent={Backdrop}
    >
      <BottomSheetView style={{ paddingBottom: insets.bottom }}>
        <View>{children}</View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

export function ContentOverlayRebuilt(
  props: ContentOverlayRebuiltProps,
): JSX.Element {
  return (
    <BottomSheetModalProvider>
      <ContentOverlayRebuiltInternal {...props} />
    </BottomSheetModalProvider>
  );
}

function Backdrop(bottomSheetBackdropProps: BottomSheetBackdropProps) {
  const styles = useStyles();

  return (
    <BottomSheetBackdrop
      {...bottomSheetBackdropProps}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      style={styles.backdrop}
      opacity={1}
    />
  );
}
