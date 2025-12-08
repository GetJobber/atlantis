import type { ReactNode } from "react";
import React, { useCallback, useImperativeHandle, useRef } from "react";
import { Keyboard, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { tokens } from "@jobber/design";
import { useStyles } from "./BottomSheet.style";
import { BottomSheetOption } from "./components/BottomSheetOption";
import { useBottomSheetBackHandler } from "./hooks/useBottomSheetBackHandler";
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

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

export function BottomSheet({
  children,
  showCancel,
  loading = false,
  heading,
  onOpen,
  onClose,
  ref,
}: BottomSheetProps & { readonly ref?: React.Ref<BottomSheetRef> }) {
  const styles = useStyles();
  const isScreenReaderEnabled = useIsScreenReaderEnabled();

  const cancellable = (showCancel && !loading) || isScreenReaderEnabled;

  const { t } = useAtlantisI18n();
  const insets = useSafeAreaInsets();
  const previousIndexRef = useRef(-1);
  const bottomSheetRef = useRef<RNBottomSheet>(null);
  const { handleSheetPositionChange } =
    useBottomSheetBackHandler(bottomSheetRef);

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current?.expand();
    },
    close: () => {
      close();
    },
  }));

  const close = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleChange = (index: number) => {
    // Handle Android back button
    handleSheetPositionChange(index);

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

  return (
    <RNBottomSheet
      ref={bottomSheetRef}
      index={-1}
      backdropComponent={Backdrop}
      backgroundStyle={styles.background}
      enablePanDownToClose={true}
      onChange={handleChange}
      keyboardBlurBehavior="restore"
      handleStyle={styles.handle}
    >
      <BottomSheetView
        style={{
          paddingBottom: insets.bottom + tokens["space-small"],
          paddingTop: tokens["space-small"],
        }}
      >
        {heading && <Header heading={heading} styles={styles} />}
        {children}
        {cancellable && (
          <Footer styles={styles} close={close} cancelLabel={t("cancel")} />
        )}
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

function Footer({
  styles,
  close,
  cancelLabel,
}: {
  readonly styles: ReturnType<typeof useStyles>;
  readonly close: () => void;
  readonly cancelLabel: string;
}) {
  return (
    <View>
      <View style={styles.footerDivider}>
        <Divider />
      </View>

      <BottomSheetOption text={cancelLabel} icon="remove" onPress={close} />
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
