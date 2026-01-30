import { memo } from "react";
import type { KeyboardAwareScrollViewProps } from "react-native-keyboard-controller";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
  type BottomSheetScrollViewMethods,
  SCROLLABLE_TYPE,
  createBottomSheetScrollableComponent,
} from "@gorhom/bottom-sheet";
import Reanimated from "react-native-reanimated";

/**
 * A keyboard-aware scroll view component that integrates with @gorhom/bottom-sheet.
 *
 * This component wraps `KeyboardAwareScrollView` from `react-native-keyboard-controller`
 * with the bottom sheet HOCs to ensure proper keyboard handling on Android when using
 * TextInputs inside a BottomSheet.
 *
 * @see https://kirillzyusko.github.io/react-native-keyboard-controller/docs/api/components/keyboard-aware-scroll-view#gorhombottom-sheet
 */
const AnimatedScrollView =
  Reanimated.createAnimatedComponent<KeyboardAwareScrollViewProps>(
    KeyboardAwareScrollView,
  );

const BottomSheetScrollViewComponent = createBottomSheetScrollableComponent<
  BottomSheetScrollViewMethods,
  KeyboardAwareScrollViewProps
>(SCROLLABLE_TYPE.SCROLLVIEW, AnimatedScrollView);

const BottomSheetKeyboardAwareScrollView = memo(BottomSheetScrollViewComponent);

BottomSheetKeyboardAwareScrollView.displayName =
  "BottomSheetKeyboardAwareScrollView";

export { BottomSheetKeyboardAwareScrollView };
export type { KeyboardAwareScrollViewProps };
