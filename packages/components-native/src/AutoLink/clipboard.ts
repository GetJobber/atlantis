import Clipboard from "@react-native-clipboard/clipboard";
import { ShowToastParams, showToast } from "../Toast";

export function copyTextToClipboard(
  text: string,
  toastConfig?: ShowToastParams,
): void {
  Clipboard.setString(text);

  if (toastConfig) {
    const { message, bottomTabsVisible } = toastConfig;
    showToast({ message, bottomTabsVisible });
  }
}
