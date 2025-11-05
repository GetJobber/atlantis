import type { ReactNode, Ref } from "react";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { Keyboard, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type {
  BottomSheetBackdropProps,
  BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { useStyles } from "./BottomSheet.style";
import { BottomSheetOption } from "./components/BottomSheetOption";
import { Divider } from "../Divider";
import { Heading } from "../Heading";
import { useIsScreenReaderEnabled } from "../hooks";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";

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

export const BottomSheet = forwardRef(BottomSheetInternal);

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

function BottomSheetInternal(
  {
    children,
    showCancel,
    loading = false,
    heading,
    onOpen,
    onClose,
  }: BottomSheetProps,
  ref: Ref<BottomSheetRef>,
) {
  const styles = useStyles();
  const isScreenReaderEnabled = useIsScreenReaderEnabled();
  const cancellable = (showCancel && !loading) || isScreenReaderEnabled;

  const { t } = useAtlantisI18n();
  const insets = useSafeAreaInsets();
  const previousIndexRef = useRef(-1);
  const bottomSheetRef = useRef<RNBottomSheet>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current?.expand();
    },
    close: () => {
      bottomSheetRef.current?.close();
    },
  }));

  const handleChange = (index: number) => {
    const previousIndex = previousIndexRef.current;

    if (previousIndex === -1 && index >= 0) {
      // Transitioned from closed to open
      dismissKeyboard();
      onOpen?.();
    } else if (previousIndex >= 0 && index === -1) {
      // Transitioned from open to closed
      dismissKeyboard();
      onClose?.();
    }

    previousIndexRef.current = index;
  };

  const renderFooter = useCallback(
    (bottomSheetFooterProps: BottomSheetFooterProps) => {
      return (
        <BottomSheetFooter {...bottomSheetFooterProps}>
          <View
            style={[styles.footerContainer, { paddingBottom: insets.bottom }]}
          >
            {cancellable && (
              <View style={styles.footer}>
                <View style={styles.footerDivider}>
                  <Divider />
                </View>
                <BottomSheetOption
                  text={t("cancel")}
                  icon={"remove"}
                  onPress={() => {
                    bottomSheetRef.current?.close();
                  }}
                />
              </View>
            )}
          </View>
        </BottomSheetFooter>
      );
    },
    [cancellable],
  );

  return (
    <RNBottomSheet
      ref={bottomSheetRef}
      index={-1}
      backdropComponent={Backdrop}
      backgroundStyle={styles.background}
      footerComponent={renderFooter}
      enablePanDownToClose={true}
      onChange={handleChange}
      keyboardBlurBehavior="restore"
    >
      <BottomSheetView
        style={styles.content}
        enableFooterMarginAdjustment={true}
      >
        {heading && <Header heading={heading} styles={styles} />}
        {children}
      </BottomSheetView>
    </RNBottomSheet>
  );
}

function Header({
  heading,
  styles,
}: {
  readonly heading: string;
  readonly styles: ReturnType<typeof useStyles>;
}) {
  return (
    <View style={styles.header}>
      <Heading level={"subtitle"}>{heading}</Heading>
    </View>
  );
}

function dismissKeyboard() {
  //Dismisses the keyboard before opening the bottom sheet.
  //In the case where an input text field is focused we don't want to show the bottom sheet behind or above keyboard
  Keyboard.dismiss();
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
