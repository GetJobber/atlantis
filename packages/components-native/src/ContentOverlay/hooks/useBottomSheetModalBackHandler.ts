import { useCallback, useRef } from "react";
import { BackHandler, type NativeEventSubscription } from "react-native";

/**
 * Hook that dismisses the bottom sheet on the hardware back button press if it is visible
 * @param bottomSheetModalRef ref to the bottom sheet modal component
 */
export function useBottomSheetModalBackHandler(onCloseController: () => void) {
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
            onCloseController();

            return true;
          },
        );
      } else if (!isBottomSheetModalVisible) {
        backHandlerSubscriptionRef.current?.remove();
        backHandlerSubscriptionRef.current = null;
      }
    },
    [onCloseController],
  );

  return { handleSheetPositionChange };
}
