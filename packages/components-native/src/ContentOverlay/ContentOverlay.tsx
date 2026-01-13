import React, { useImperativeHandle, useMemo, useRef, useState } from "react";
import { AccessibilityInfo, View, findNodeHandle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type {
  BottomSheetBackdropProps,
  BottomSheetModal as BottomSheetModalType,
  BottomSheetScrollViewMethods,
} from "@gorhom/bottom-sheet";
import type { ContentOverlayProps, ModalBackgroundColor } from "./types";
import { useStyles } from "./ContentOverlay.style";
import { useBottomSheetModalBackHandler } from "./hooks/useBottomSheetModalBackHandler";
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
export function ContentOverlay({
  children,
  title,
  accessibilityLabel,
  fullScreen = false,
  showDismiss = false,
  isDraggable = true,
  adjustToContentHeight = false,
  keyboardShouldPersistTaps = false,
  scrollEnabled = false,
  modalBackgroundColor = "surface",
  onClose,
  onOpen,
  onBeforeExit,
  loading = false,
  ref,
}: ContentOverlayProps) {
  const insets = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModalType>(null);
  const previousIndexRef = useRef(-1);
  const [currentPosition, setCurrentPosition] = useState<number>(-1);

  const styles = useStyles();
  const { t } = useAtlantisI18n();
  const { tokens } = useAtlantisTheme();
  const isScreenReaderEnabled = useIsScreenReaderEnabled();

  const isFullScreenOrTopPosition =
    fullScreen || (!adjustToContentHeight && currentPosition === 0);
  const shouldShowDismiss =
    showDismiss || isScreenReaderEnabled || isFullScreenOrTopPosition;

  // When this is enabled, it prevents the modal from being dragged to fullscreen. This is solely necessary
  // to match the behaviour of the previous library. Ideally we should consider ripping this out, but there's
  // a lot of surface area to test and verify.
  const draggable = onBeforeExit
    ? false
    : isDraggable && !adjustToContentHeight;
  // Prevent the Overlay from being flush with the top of the screen, even if we are "100%" or "fullscreen"
  const topInset = insets.top || tokens["space-larger"];

  const [showHeaderShadow, setShowHeaderShadow] = useState<boolean>(false);
  const overlayHeader = useRef<View>(null);
  const scrollViewRef = useRef<
    BottomSheetScrollViewMethods & { scrollTop?: number }
  >(null);

  // enableDynamicSizing will add another snap point of the content height
  const snapPoints = useMemo(() => {
    return ["100%"];
  }, []);

  const onCloseController = () => {
    if (!onBeforeExit) {
      bottomSheetModalRef.current?.dismiss();
    } else {
      onBeforeExit();
    }
  };

  const { handleSheetPositionChange } =
    useBottomSheetModalBackHandler(onCloseController);

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetModalRef.current?.present();
    },
    close: () => {
      bottomSheetModalRef.current?.dismiss();
    },
  }));

  const handleChange = (index: number, position: number) => {
    const previousIndex = previousIndexRef.current;

    setCurrentPosition(position);
    handleSheetPositionChange(index);

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

  const handleOnScroll = () => {
    const scrollTop = scrollViewRef.current?.scrollTop || 0;
    setShowHeaderShadow(scrollTop > 0);
  };

  const modalStyle = [
    styles.background,
    // TODO: Add large screen styles?
    // windowWidth > 640 ? styles.modalForLargeScreens : undefined,
    { backgroundColor: getModalBackgroundColor(modalBackgroundColor, tokens) },
  ];

  const handleIndicatorStyles = [
    styles.handle,
    !draggable && {
      opacity: 0,
    },
  ];

  const renderHeader = () => {
    const closeOverlayA11YLabel = t("ContentOverlay.close", {
      title: title,
    });

    const headerStyles = [
      styles.header,
      {
        // Background color is necessary for scrollable modals as the content flows behind the header.
        backgroundColor: getModalBackgroundColor(modalBackgroundColor, tokens),
      },
    ];

    const headerShadowStyles = [
      showHeaderShadow && styles.headerShadow,
      {
        backgroundColor: getModalBackgroundColor(modalBackgroundColor, tokens),
      },
    ];

    return (
      <View testID="ATL-Overlay-Header">
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
        <View>
          <View style={headerShadowStyles} />
        </View>
      </View>
    );
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleChange}
      backgroundStyle={modalStyle}
      handleStyle={styles.handleWrapper}
      handleIndicatorStyle={handleIndicatorStyles}
      backdropComponent={props => (
        <Backdrop {...props} pressBehavior={onBeforeExit ? "none" : "close"} />
      )}
      snapPoints={snapPoints}
      enablePanDownToClose={draggable}
      enableContentPanningGesture={draggable}
      enableHandlePanningGesture={draggable}
      enableDynamicSizing={!fullScreen || adjustToContentHeight}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      topInset={topInset}
    >
      {scrollEnabled ? (
        <BottomSheetScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          keyboardShouldPersistTaps={
            keyboardShouldPersistTaps ? "handled" : "never"
          }
          showsVerticalScrollIndicator={false}
          onScroll={handleOnScroll}
          stickyHeaderIndices={[0]}
        >
          {renderHeader()}
          <View testID="ATL-Overlay-Children">{children}</View>
        </BottomSheetScrollView>
      ) : (
        <BottomSheetView>
          {renderHeader()}
          <View
            style={{ paddingBottom: insets.bottom }}
            testID="ATL-Overlay-Children"
          >
            {children}
          </View>
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
}

function Backdrop(
  bottomSheetBackdropProps: BottomSheetBackdropProps & {
    pressBehavior: "none" | "close";
  },
) {
  const styles = useStyles();
  const { pressBehavior, ...props } = bottomSheetBackdropProps;

  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      style={styles.backdrop}
      opacity={1}
      pressBehavior={pressBehavior}
    />
  );
}
