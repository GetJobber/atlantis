import { defineMessages } from "react-intl";

export const messages = defineMessages({
  defaultAccessibilityLabel: {
    id: "defaultAccessibilityLabel",
    defaultMessage: "Attachment Preview",
    description: "The default accessibility label",
  },
  defaultAccessibilityHint: {
    id: "defaultAccessibilityHint",
    defaultMessage: "Select for more options",
    description: "The default accessibility hint",
  },
  errorAccessibilityLabel: {
    id: "errorAccessibilityLabel",
    defaultMessage: "Failed upload",
    description: "The accessibility label for error states",
  },
  inProgressAccessibilityLabel: {
    id: "inProgress",
    defaultMessage: "Upload in progress",
    description: "The accessibility label for in-progress states",
  },
});
