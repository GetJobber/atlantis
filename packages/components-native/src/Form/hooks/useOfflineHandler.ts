import { useCallback } from "react";
import { Alert } from "react-native";
import { useAtlantisI18n } from "../../hooks/useAtlantisI18n";

export function useOfflineHandler(): (
  callback: () => void,
  dismiss: () => void,
) => () => void {
  const { t } = useAtlantisI18n();

  const handleOfflineSubmit = useCallback(
    (callback: () => void, dismiss: () => void) => {
      return () => {
        Alert.alert(
          t("networkUnavailableTitle"),
          t("networkUnavailableDescription"),
          [
            {
              text: t("dismiss"),
              style: "cancel",
              onPress: dismiss,
            },
            {
              text: t("tryAgain"),
              style: "default",
              onPress: callback,
            },
          ],
        );
      };
    },
    [t],
  );
  return handleOfflineSubmit;
}
