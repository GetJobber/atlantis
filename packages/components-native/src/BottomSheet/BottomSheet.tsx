import React, { ReactNode, Ref, RefObject, forwardRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Keyboard, View } from "react-native";
import { BottomSheetOption } from "./components/BottomSheetOption";
import { styles } from "./BottomSheet.style";
import { useIsScreenReaderEnabled } from "../hooks";
import { Divider } from "../Divider";
import { Heading } from "../Heading";
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

export type BottomSheetRef = Modalize | undefined;

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
  const isScreenReaderEnabled = useIsScreenReaderEnabled();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {open && <Overlay />}
      <Modalize
        ref={ref}
        adjustToContentHeight={true}
        modalStyle={styles.modal}
        overlayStyle={styles.overlayModalize}
        HeaderComponent={heading && <Header heading={heading} />}
        FooterComponent={
          <Footer
            cancellable={(showCancel && !loading) || isScreenReaderEnabled}
            onCancel={() => {
              (ref as RefObject<BottomSheetRef>)?.current?.close();
            }}
          />
        }
        withHandle={false}
        withReactModal={isScreenReaderEnabled}
        onOpen={openModal}
        onClose={closeModal}
      >
        <View
          style={
            !showCancel && !isScreenReaderEnabled ? styles.children : undefined
          }
        >
          {children}
        </View>
      </Modalize>
    </>
  );

  function openModal() {
    onOpen?.();
    setOpen(true);
    dismissKeyboard();
  }

  function closeModal() {
    onClose?.();
    setOpen(false);
  }
}

function Header({ heading }: { heading: string }) {
  return (
    <View style={styles.header}>
      <Heading level={"subtitle"}>{heading}</Heading>
    </View>
  );
}

function Footer({
  cancellable,
  onCancel,
}: {
  cancellable: boolean;
  onCancel: () => void;
}) {
  const insets = useSafeAreaInsets();
  const { t } = useAtlantisI18n();

  return (
    <View style={{ marginBottom: insets.bottom }}>
      {cancellable && (
        <View style={styles.children}>
          <View style={styles.footerDivider}>
            <Divider />
          </View>
          <BottomSheetOption
            text={t("cancel")}
            icon={"remove"}
            onPress={onCancel}
          />
        </View>
      )}
    </View>
  );
}

function dismissKeyboard() {
  //Dismisses the keyboard before opening the bottom sheet.
  //In the case where an input text field is focused we don't want to show the bottom sheet behind or above keyboard
  Keyboard.dismiss();
}

function Overlay() {
  return <View style={styles.overlay} />;
}
