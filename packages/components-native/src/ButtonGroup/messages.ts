import { defineMessages } from "react-intl";

export const messages = defineMessages({
  more: {
    id: "more",
    defaultMessage: "More",
    description: "Accessibility label for the More button",
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
