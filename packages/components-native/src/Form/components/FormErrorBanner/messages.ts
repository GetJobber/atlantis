import { defineMessages } from "react-intl";

export const messages = defineMessages({
  networkError: {
    id: "networkError",
    defaultMessage: "Could not save changes",
    description: "Displayed when a general server error occurs during save",
  },
  offlineError: {
    id: "offlineError",
    defaultMessage: "Currently offline. Check your internet connection.",
    description: "Error message to be shown when the app is offline",
  },
});
