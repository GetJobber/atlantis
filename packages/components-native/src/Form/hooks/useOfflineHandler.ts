import { useCallback } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { messages } from "../messages";

export function useOfflineHandler(): (
  callback: () => void,
  dismiss: () => void,
) => () => void {
  const { formatMessage } = useIntl();

  const handleOfflineSubmit = useCallback(
    (callback: () => void, dismiss: () => void) => {
      return () => {
        Alert.alert(
          formatMessage(messages.unavailableNetworkTitle),
          formatMessage(messages.unavailableNetworkMessage),
          [
            {
              text: formatMessage(messages.dismissAlertButton),
              style: "cancel",
              onPress: dismiss,
            },
            {
              text: formatMessage(messages.retryAlertButton),
              style: "default",
              onPress: callback,
            },
          ],
        );
      };
    },
    [formatMessage],
  );
  return handleOfflineSubmit;
}
