import { useCallback, useRef } from "react";
import { BackHandler, type NativeEventSubscription } from "react-native";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";

/**
 * Hook that dismisses the bottom sheet on the hardware back button press if it is visible
 * @param bottomSheetModalRef ref to the bottom sheet modal component
 */
export function useBottomSheetModalBackHandler(
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>,
) {
  const backHandlerSubscriptionRef = useRef<NativeEventSubscription | null>(
    null,
  );

  const handleSheetPositionChange = useCallback(
    (index: number) => {
      const isBottomSheetModalVisible = index >= 0;

      if (isBottomSheetModalVisible && !backHandlerSubscriptionRef.current) {
        // Setup the back handler if the bottom sheet is right in front of the user
        backHandlerSubscriptionRef.current = BackHandler.addEventListener(
          "hardwareBackPress",
          () => {
            bottomSheetModalRef.current?.dismiss();

            return true;
          },
        );
      } else if (!isBottomSheetModalVisible) {
        backHandlerSubscriptionRef.current?.remove();
        backHandlerSubscriptionRef.current = null;
      }
    },
    [bottomSheetModalRef],
  );

  return { handleSheetPositionChange };
}
