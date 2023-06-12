import { useHeaderHeight } from "@react-navigation/stack";
import { useWindowDimensions } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { KEYBOARD_TOP_PADDING_AUTO_SCROLL } from "../constants";

interface UseScreenInformation {
  readonly windowHeight: number;
  readonly headerHeight: number;
  readonly insets: EdgeInsets;
}

export function useScreenInformation(): UseScreenInformation {
  const windowHeight = useWindowDimensions().height;
  const headerHeight = useHeaderHeight() + KEYBOARD_TOP_PADDING_AUTO_SCROLL;

  const insets = useSafeAreaInsets();

  return {
    windowHeight,
    headerHeight,
    insets,
  } as const;
}
