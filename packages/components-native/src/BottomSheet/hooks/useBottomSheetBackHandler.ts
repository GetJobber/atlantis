import { useCallback, useRef } from "react";
import { BackHandler, type NativeEventSubscription } from "react-native";
import type BottomSheet from "@gorhom/bottom-sheet";

/**
 * Hook that closes the bottom sheet on the hardware back button press if it is visible
 * @param bottomSheetRef ref to the bottom sheet component
 */
export function useBottomSheetBackHandler(
  bottomSheetRef: React.RefObject<BottomSheet | null>,
): {
  handleSheetPositionChange: (index: number) => void;
} {
  const backHandlerSubscriptionRef = useRef<NativeEventSubscription | null>(
    null,
  );

  const handleSheetPositionChange = useCallback(
    (index: number) => {
      const isBottomSheetVisible = index >= 0;

      if (isBottomSheetVisible && !backHandlerSubscriptionRef.current) {
        // Setup the back handler if the bottom sheet is right in front of the user
        backHandlerSubscriptionRef.current = BackHandler.addEventListener(
          "hardwareBackPress",
          () => {
            bottomSheetRef.current?.close();

            return true;
          },
        );
      } else if (!isBottomSheetVisible) {
        backHandlerSubscriptionRef.current?.remove();
        backHandlerSubscriptionRef.current = null;
      }
    },
    [bottomSheetRef],
  );

  return { handleSheetPositionChange };
}
