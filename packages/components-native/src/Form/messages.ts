import { defineMessages } from "react-intl";

export const messages = defineMessages({
  loadingA11YLabel: {
    id: "loadingA11yLabel",
    defaultMessage: "Loading",
    description: "Accessibility label for the loading indicator",
  },

  dismissAlertButton: {
    id: "dismiss",
    defaultMessage: "Dismiss",
    description: "The label for the button to dismiss the alert ",
  },

  retryAlertButton: {
    id: "retry",
    defaultMessage: "Try Again",
    description: "The label for the alert button to try action again",
  },

  unavailableNetworkTitle: {
    id: "unavailableNetworkTitle",
    defaultMessage: "Network unavailable",
    description: "The title for alert about network unavailable",
  },

  unavailableNetworkMessage: {
    id: "unavailableNetworkMessage",
    defaultMessage: "Check your internet connection and try again later.",
    description: "The message for alert about network unavailable",
  },
});
