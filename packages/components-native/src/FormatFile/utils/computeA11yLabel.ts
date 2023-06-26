import { MessageDescriptor } from "react-intl";
import { messages } from "../messages";

interface params {
  accessibilityLabel?: string;
  showOverlay: boolean;
  showError: boolean;
  formatMessage: (message: MessageDescriptor) => string;
}

export function computeA11yLabel({
  accessibilityLabel,
  showOverlay,
  showError,
  formatMessage,
}: params): string {
  if (!showError && showOverlay) {
    return formatMessage(messages.inProgressAccessibilityLabel);
  } else if (showError) {
    return formatMessage(messages.errorAccessibilityLabel);
  } else {
    return (
      accessibilityLabel || formatMessage(messages.defaultAccessibilityLabel)
    );
  }
}
