import { defineMessages } from "react-intl";

export const messages = defineMessages({
  allVisitsCompleted: {
    id: "allVisitsCompleted",
    defaultMessage: "All visits completed",
    description: "Progress bar title when all visits are completed",
  },
  noVisitsCompleted: {
    id: "noVisitsCompleted",
    defaultMessage: "0 visits completed",
    description: "Progress bar title when no visits are completed",
  },
  visitsComplete: {
    id: "visitsComplete",
    defaultMessage: "{title}",
    description: "Progress bar title when a visit/visits are completed",
  },
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
