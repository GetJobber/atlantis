import { Platform } from "react-native";
import { useScreenInformation } from "./useScreenInformation";
import { tokens } from "../../utils/design";

interface UseSaveButtonPositionReturn {
  saveButtonPosition: "sticky" | "inline";
}

interface UseSaveButtonPositionParams {
  formContentHeight: number;
  isBottomSheetOpen: boolean;
  showStickySaveButton: boolean;
  keyboardHeight: number;
  keyboardScreenY: number;
}

export function useSaveButtonPosition({
  formContentHeight,
  isBottomSheetOpen,
  showStickySaveButton,
  keyboardHeight,
  keyboardScreenY,
}: UseSaveButtonPositionParams): UseSaveButtonPositionReturn {
  const { headerHeight } = useScreenInformation();

  if (showStickySaveButton) {
    return {
      saveButtonPosition: "sticky",
    };
  }

  if (Platform.OS === "android" || isBottomSheetOpen) {
    return {
      saveButtonPosition: "inline",
    };
  }

  const isKeyboardOpen = Boolean(keyboardHeight);

  // tokens["space-large"] acts like a safe space below the form to avoid
  // rendering the sticky button above the form elements.
  const calculatedFormContentHeight =
    formContentHeight + headerHeight + tokens["space-large"];

  const isKeyboardOverForm = calculatedFormContentHeight > keyboardScreenY;

  const showInlineSaveButton = isKeyboardOpen && isKeyboardOverForm;

  return {
    saveButtonPosition: showInlineSaveButton ? "inline" : "sticky",
  };
}
