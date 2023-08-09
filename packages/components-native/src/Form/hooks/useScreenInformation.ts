import { useWindowDimensions } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { KEYBOARD_TOP_PADDING_AUTO_SCROLL } from "../constants";
import { useAtlantisContext } from "../../AtlantisContext";

interface UseScreenInformation {
  readonly windowHeight: number;
  readonly headerHeight: number;
  readonly insets: EdgeInsets;
}

export function useScreenInformation(): UseScreenInformation {
  const { headerHeight } = useAtlantisContext();
  const windowHeight = useWindowDimensions().height;
  const headerHeightWithPadding =
    headerHeight + KEYBOARD_TOP_PADDING_AUTO_SCROLL;

  const insets = useSafeAreaInsets();

  return {
    windowHeight,
    headerHeight: headerHeightWithPadding,
    insets,
  } as const;
}
