import { defineMessages } from "react-intl";

export const messages = defineMessages({
  complete: {
    id: "complete",
    defaultMessage: "{current} of {total} complete",
    description: "Progress bar accessibilityLabel for current/total",
  },
  inProgress: {
    id: "inProgress",
    defaultMessage: "{inProgress} in progress",
    description: "Progress bar accessibilityLabel for inProgress/total",
  },
});
