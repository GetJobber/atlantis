import React, { useImperativeHandle, useRef, useState } from "react";
import { AccessibilityInfo, View, findNodeHandle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type {
  BottomSheetBackdropProps,
  BottomSheetModal as BottomSheetModalType,
} from "@gorhom/bottom-sheet";
import type { ContentOverlayRebuiltProps, ModalBackgroundColor } from "./types";
import { useStyles } from "./ContentOverlay.rebuilt.style";
import { useViewLayoutHeight } from "./hooks/useViewLayoutHeight";
import { useIsScreenReaderEnabled } from "../hooks";
import { IconButton } from "../IconButton";
import { Heading } from "../Heading";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";
import { useAtlantisTheme } from "../AtlantisThemeContext";

function getModalBackgroundColor(
  variation: ModalBackgroundColor,
  tokens: ReturnType<typeof useAtlantisTheme>["tokens"],
) {
  switch (variation) {
    case "surface":
      return tokens["color-surface"];
    case "background":
      return tokens["color-surface--background"];
  }
}

// eslint-disable-next-line max-statements
export function ContentOverlayRebuilt({
  children,
  title,
  accessibilityLabel,
  fullScreen = false,
  showDismiss = false,
  adjustToContentHeight = false,
  modalBackgroundColor = "surface",
  onClose,
  onOpen,
  onBeforeExit,
  loading = false,
  ref,
}: ContentOverlayRebuiltProps): JSX.Element {
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModalType>(null);
  const previousIndexRef = useRef(-1);
  const styles = useStyles();
  const { t } = useAtlantisI18n();
  const { tokens } = useAtlantisTheme();
  const [position] = useState<"top" | "initial">("initial");
  const isScreenReaderEnabled = useIsScreenReaderEnabled();
  const isFullScreenOrTopPosition =
    fullScreen || (!adjustToContentHeight && position === "top");
  const shouldShowDismiss =
    showDismiss || isScreenReaderEnabled || isFullScreenOrTopPosition;
  const [showHeaderShadow] = useState<boolean>(false);
  const overlayHeader = useRef<View>(null);

  const { handleLayout: handleHeaderLayout } = useViewLayoutHeight();

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

      // Set accessibility focus on header when opened
      if (overlayHeader.current) {
        const reactTag = findNodeHandle(overlayHeader.current);

        if (reactTag) {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      }
    } else if (previousIndex >= 0 && index === -1) {
      // Transitioned from open to closed
      onClose?.();
    }

    previousIndexRef.current = index;
  };

  const onCloseController = () => {
    if (!onBeforeExit) {
      bottomSheetModalRef.current?.dismiss();

      return true;
    } else {
      onBeforeExit();

      return false;
    }
  };

  const renderHeader = () => {
    const closeOverlayA11YLabel = t("ContentOverlay.close", {
      title: title,
    });

    const headerStyles = [
      styles.header,
      showHeaderShadow && styles.headerShadow,
      {
        backgroundColor: getModalBackgroundColor(modalBackgroundColor, tokens),
      },
    ];

    return (
      <View onLayout={handleHeaderLayout} testID="ATL-Overlay-Header">
        <View style={headerStyles}>
          <View
            style={[
              styles.title,
              shouldShowDismiss
                ? styles.titleWithDismiss
                : styles.titleWithoutDismiss,
            ]}
          >
            <Heading
              level="subtitle"
              variation={loading ? "subdued" : "heading"}
              align={"start"}
            >
              {title}
            </Heading>
          </View>

          {shouldShowDismiss && (
            <View
              style={styles.dismissButton}
              ref={overlayHeader}
              accessibilityLabel={accessibilityLabel || closeOverlayA11YLabel}
              accessible={true}
            >
              <IconButton
                name="cross"
                customColor={
                  loading ? tokens["color-disabled"] : tokens["color-heading"]
                }
                onPress={() => onCloseController()}
                accessibilityLabel={closeOverlayA11YLabel}
                testID="ATL-Overlay-CloseButton"
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleChange}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handle}
      backdropComponent={Backdrop}
      name="content-overlay-rebuilt"
    >
      <BottomSheetView style={styles.content}>
        {renderHeader()}
        <View style={{ paddingBottom: insets.bottom }}>{children}</View>
      </BottomSheetView>
    </BottomSheetModal>
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
