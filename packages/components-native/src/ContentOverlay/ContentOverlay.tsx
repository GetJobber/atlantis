import React, {
  ReactNode,
  Ref,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Modalize } from "react-native-modalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AccessibilityInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  View,
  findNodeHandle,
  useWindowDimensions,
} from "react-native";
import { Portal } from "react-native-portalize";
import { useIntl } from "react-intl";
import { useKeyboardVisibility } from "./hooks/useKeyboardVisibility";
import { styles } from "./ContentOverlay.style";
import { messages } from "./messages";
import { useViewLayoutHeight } from "./hooks/useViewLayoutHeight";
import { useIsScreenReaderEnabled } from "../hooks";
import { IconButton } from "../IconButton";
import { tokens } from "../utils/design";
import { Heading } from "../Heading";

interface ContentOverlayProps {
  /**
   * Content to be passed into the overlay
   */
  readonly children: ReactNode;
  /**
   * Title of overlay, appears in the header next to the close button.
   */
  readonly title: string;
  /**
   * Optional accessibilityLabel describing the overlay.
   * This will read out when the overlay is opened.
   * @default "Close {title} modal"
   */
  readonly accessibilityLabel?: string;
  /**
   * Force overlay height to fill the screen.
   * Width not impacted.
   * @default false
   */
  readonly fullScreen?: boolean;
  /**
   * Display the dismiss button in the header of the overlay.
   * @default false
   */
  readonly showDismiss?: boolean;
  /**
   * If false, hides the handle and turns off dragging.
   * @default true
   */
  readonly isDraggable?: boolean;
  /**
   * If true, automatically adjusts the overlay height to the content height.
   * This will disable the ability to drag the overlay to fullscreen when
   * `isDraggable` is true.
   * @default false
   */
  readonly adjustToContentHeight?: boolean;
  /**
   * Allows taps to be registered behind keyboard if enabled
   * @default false
   */
  readonly keyboardShouldPersistTaps?: boolean;
  /**
   * Enables scrolling in the content body of overlay
   */
  readonly scrollEnabled?: boolean;
  /**
   * Set the background color of the modal window
   * @default "surface"
   */
  readonly modalBackgroundColor?: ModalBackgroundColor;
  /**
   * Callback that is called when the overlay is closed.
   */
  readonly onClose?: () => void;
  /**
   * Callback that is called when the overlay is opened.
   */
  readonly onOpen?: () => void;

  /**
   * Callback that is called between overlay is closed and when the "x" button is pressed
   */
  readonly onBeforeExit?: () => void;

  /**
   * Define the behavior of the keyboard when having inputs inside the modal.
   * @default padding
   */
  readonly keyboardAvoidingBehavior?: "height" | "padding" | "position";

  /**
   * Boolean to show a disabled state
   * @default false
   */
  readonly loading?: boolean;

  /**
   * Define keyboard's Android behavior like iOS's one.
   * @default Platform.select({ ios: true, android: false })
   */
  readonly avoidKeyboardLikeIOS?: boolean;
}

export const ContentOverlay = forwardRef(ContentOverlayPortal);
const ContentOverlayModal = forwardRef(ContentOverlayInternal);

export type ContentOverlayRef =
  | {
      open?: Modalize["open"];
      close?: Modalize["close"];
    }
  | undefined;

// eslint-disable-next-line max-statements
function ContentOverlayInternal(
  {
    children,
    title,
    accessibilityLabel,
    fullScreen = false,
    showDismiss = false,
    isDraggable = true,
    adjustToContentHeight = false,
    keyboardShouldPersistTaps = false,
    keyboardAvoidingBehavior,
    scrollEnabled = false,
    modalBackgroundColor = "surface",
    onClose,
    onOpen,
    onBeforeExit,
    loading = false,
    avoidKeyboardLikeIOS,
  }: ContentOverlayProps,
  ref: Ref<ContentOverlayRef>,
): JSX.Element {
  isDraggable = onBeforeExit ? false : isDraggable;
  const isCloseableOnOverlayTap = onBeforeExit ? false : true;
  const { formatMessage } = useIntl();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [position, setPosition] = useState<"top" | "initial">("initial");
  const isScreenReaderEnabled = useIsScreenReaderEnabled();
  const shouldShowDismiss =
    showDismiss ||
    isScreenReaderEnabled ||
    fullScreen ||
    (!adjustToContentHeight && position === "top");
  const [showHeaderShadow, setShowHeaderShadow] = useState<boolean>(false);
  const overlayHeader = useRef<View>();

  const internalRef = useRef<Modalize>();
  const [modalizeMethods, setModalizeMethods] = useState<ContentOverlayRef>();
  const callbackInternalRef = useCallback((instance: Modalize) => {
    if (instance && !internalRef.current) {
      internalRef.current = instance;
      setModalizeMethods(instance);
    }
  }, []);

  const refMethods = useMemo(() => {
    if (!modalizeMethods?.open || !modalizeMethods?.close) {
      return {};
    }
    return {
      open: modalizeMethods?.open,
      close: modalizeMethods?.close,
    };
  }, [modalizeMethods]);

  const { keyboardHeight } = useKeyboardVisibility();
  useImperativeHandle(ref, () => refMethods, [refMethods]);

  const {
    handleLayout: handleChildrenLayout,
    height: childrenHeight,
    heightKnown: childrenHeightKnown,
  } = useViewLayoutHeight();
  const {
    handleLayout: handleHeaderLayout,
    height: headerHeight,
    heightKnown: headerHeightKnown,
  } = useViewLayoutHeight();

  const snapPoint = useMemo(() => {
    if (fullScreen || !isDraggable || adjustToContentHeight) {
      return undefined;
    }
    const overlayHeight = headerHeight + childrenHeight;
    if (overlayHeight >= windowHeight) {
      return undefined;
    }
    return overlayHeight;
  }, [
    fullScreen,
    isDraggable,
    adjustToContentHeight,
    headerHeight,
    childrenHeight,
    windowHeight,
  ]);

  const modalStyle = [
    styles.modal,
    windowWidth > 640 ? styles.modalForLargeScreens : undefined,
    { backgroundColor: getModalBackgroundColor(modalBackgroundColor) },
    keyboardHeight > 0 && { marginBottom: 0 },
  ];

  const renderedChildren = renderChildren();
  const renderedHeader = renderHeader();

  const onCloseController = () => {
    if (!onBeforeExit) {
      internalRef.current?.close();
      return true;
    } else {
      onBeforeExit();
      return false;
    }
  };

  return (
    <>
      {headerHeightKnown && childrenHeightKnown && (
        <Modalize
          ref={callbackInternalRef}
          overlayStyle={styles.overlay}
          handleStyle={styles.handle}
          handlePosition="inside"
          modalStyle={modalStyle}
          modalTopOffset={tokens["space-larger"]}
          snapPoint={snapPoint}
          closeSnapPointStraightEnabled={false}
          withHandle={isDraggable}
          panGestureEnabled={isDraggable}
          adjustToContentHeight={adjustToContentHeight}
          disableScrollIfPossible={!adjustToContentHeight} // workaround for scroll not working on Android when content fills the screen with adjustToContentHeight
          onClose={onClose}
          onOpen={onOpen}
          keyboardAvoidingBehavior={keyboardAvoidingBehavior}
          avoidKeyboardLikeIOS={avoidKeyboardLikeIOS}
          childrenStyle={styles.childrenStyle}
          onBackButtonPress={onCloseController}
          closeOnOverlayTap={isCloseableOnOverlayTap}
          onOpened={() => {
            if (overlayHeader.current) {
              const reactTag = findNodeHandle(overlayHeader.current);
              if (reactTag) {
                AccessibilityInfo.setAccessibilityFocus(reactTag);
              }
            }
          }}
          scrollViewProps={{
            scrollEnabled,
            showsVerticalScrollIndicator: false,
            stickyHeaderIndices: Platform.OS === "android" ? [0] : undefined,
            onScroll: handleOnScroll,
            keyboardShouldPersistTaps: keyboardShouldPersistTaps
              ? "handled"
              : "never",
          }}
          HeaderComponent={Platform.OS === "ios" ? renderedHeader : undefined}
          onPositionChange={setPosition}
        >
          {Platform.OS === "android" ? renderedHeader : undefined}
          {renderedChildren}
        </Modalize>
      )}
      {!childrenHeightKnown && (
        <View style={[styles.hiddenContent, modalStyle]}>
          {renderedChildren}
        </View>
      )}
      {!headerHeightKnown && (
        <View style={[styles.hiddenContent, modalStyle]}>{renderedHeader}</View>
      )}
    </>
  );

  function renderHeader() {
    const closeOverlayA11YLabel = formatMessage(
      messages.closeOverlayA11YLabel,
      {
        title: title,
      },
    );

    const headerStyles = [
      styles.header,
      showHeaderShadow && styles.headerShadow,
      { backgroundColor: getModalBackgroundColor(modalBackgroundColor) },
    ];

    return (
      <View onLayout={handleHeaderLayout} testID="ATL-Overlay-Header">
        <View style={headerStyles}>
          <View
            style={
              showDismiss ? styles.titleWithDismiss : styles.titleWithoutDimiss
            }
          >
            <Heading
              level="subtitle"
              variation={loading ? "subdued" : "heading"}
            >
              {title}
            </Heading>
          </View>
          {shouldShowDismiss && (
            <View
              style={styles.dismissButton}
              // @ts-expect-error tsc-ci
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
  }

  function renderChildren() {
    return (
      <View
        style={{ paddingBottom: insets.bottom }}
        onLayout={handleChildrenLayout}
        testID="ATL-Overlay-Children"
      >
        {children}
      </View>
    );
  }

  function handleOnScroll({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) {
    setShowHeaderShadow(nativeEvent.contentOffset.y > 0);
  }

  function getModalBackgroundColor(variation: ModalBackgroundColor) {
    switch (variation) {
      case "surface":
        return tokens["color-surface"];
      case "background":
        return tokens["color-surface--background"];
    }
  }
}

function ContentOverlayPortal(
  modalProps: ContentOverlayProps,
  ref: Ref<ContentOverlayRef>,
) {
  return (
    <Portal>
      <ContentOverlayModal ref={ref} {...modalProps} />
    </Portal>
  );
}

export type ModalBackgroundColor = "surface" | "background";
