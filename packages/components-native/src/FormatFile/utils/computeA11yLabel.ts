import { useAtlantisI18nValue } from "../../hooks/useAtlantisI18n";

interface params {
  readonly accessibilityLabel?: string;
  readonly showOverlay: boolean;
  readonly showError: boolean;
  readonly t: useAtlantisI18nValue["t"];
}

export function computeA11yLabel({
  accessibilityLabel,
  showOverlay,
  showError,
  t,
}: params): string {
  if (!showError && showOverlay) {
    return t("upload.inProgress");
  } else if (showError) {
    return t("upload.failed");
  } else {
    return accessibilityLabel || t("FormatFile.label");
  }
}
