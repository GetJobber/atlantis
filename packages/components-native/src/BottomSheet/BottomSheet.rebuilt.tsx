import type { ReactNode, Ref, RefObject } from "react";
import React, { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type {
  BottomSheetBackdropProps,
  BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { useStyles } from "./BottomSheet.rebuilt.style";
import { BottomSheetOption } from "./components/BottomSheetOption";
import { Divider } from "../Divider";
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

export type BottomSheetRebuiltRef = BottomSheet;

export function BottomSheetRebuilt({
  ref,
  ...props
}: BottomSheetProps & { readonly ref: Ref<BottomSheetRebuiltRef> }) {
  const styles = useStyles();
  const isScreenReaderEnabled = useIsScreenReaderEnabled();
  const cancellable =
    (props.showCancel && !props.loading) || isScreenReaderEnabled;

  const { t } = useAtlantisI18n();
  const insets = useSafeAreaInsets();
  const renderBackdrop = useCallback(
    (bottomSheetBackdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...bottomSheetBackdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        style={styles.overlay}
        opacity={1}
      />
    ),
    [],
  );

  const renderFooter = useCallback(
    (bottomSheetFooterProps: BottomSheetFooterProps) => {
      return (
        <BottomSheetFooter
          {...bottomSheetFooterProps}
          bottomInset={insets.bottom}
        >
          <View>
            {cancellable && (
              <View>
                <View style={styles.footerDivider}>
                  <Divider />
                </View>
                <BottomSheetOption
                  text={t("cancel")}
                  icon={"remove"}
                  onPress={() =>
                    (ref as RefObject<BottomSheetRebuiltRef>)?.current?.close()
                  }
                />
              </View>
            )}
          </View>
        </BottomSheetFooter>
      );
    },
    [cancellable],
  );

  // const snapPoints = useMemo(() => ["25%", "50%"], []);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.modal}
      footerComponent={renderFooter}
      enablePanDownToClose={true}
      // enableDynamicSizing={false}
      // snapPoints={snapPoints}
    >
      <BottomSheetView
        style={styles.children}
        enableFooterMarginAdjustment={true}
      >
        {props.children}
      </BottomSheetView>
    </BottomSheet>
  );
}
