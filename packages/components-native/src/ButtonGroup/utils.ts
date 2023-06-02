import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { Alert } from "react-native";
import { messages } from "./messages";
import {
  ButtonGroupActionElement,
  ButtonGroupPrimaryActionElement,
} from "./types";
import {
  ButtonGroupActionProps,
  PrimaryAction,
  SecondaryAction,
} from "./ButtonGroupAction";
import { useAtlantisContext } from "../AtlantisContext/AtlantisContext";

interface UsePreventTapWhenOfflineShape {
  readonly handlePress: (
    callback: ButtonGroupActionProps["onPress"],
  ) => () => void;
}

/**
 * Determine if the onPress should be fired or an alert when the device is
 * online or offline
 */
export function usePreventTapWhenOffline(): UsePreventTapWhenOfflineShape {
  const { formatMessage } = useIntl();
  const { isOnline } = useAtlantisContext();

  const handlePress = useCallback(
    (callback: ButtonGroupActionProps["onPress"]) => {
      if (isOnline) return callback;

      return () =>
        Alert.alert(
          formatMessage(messages.unavailableNetworkTitle),
          formatMessage(messages.unavailableNetworkMessage),
        );
    },
    [formatMessage, isOnline],
  );

  return { handlePress };
}

interface GetActionShape {
  readonly primaryActions: ButtonGroupPrimaryActionElement[];
  readonly secondaryActions: ButtonGroupActionElement[];
}

/**
 * Separate the Primary and Secondary actions into 2 const
 */
export function getActions(
  children: ButtonGroupActionElement | ButtonGroupActionElement[],
): GetActionShape {
  const childArray = React.Children.toArray(
    children,
  ) as ButtonGroupActionElement[];

  let primaryActions = childArray.filter(
    action =>
      /* Checking the component type does not work in dev environments due to
       * wrapper components used for hot-reload
       * However, checking the type name does not work in prod due to code minification
       * Hence 2 different checks here */
      action.type === PrimaryAction || action.type.name === "PrimaryAction",
  ) as ButtonGroupPrimaryActionElement[];

  let secondaryActions = childArray.filter(
    action =>
      action.type === SecondaryAction || action.type.name === "SecondaryAction",
  );

  if (primaryActions.length > 2) {
    secondaryActions = primaryActions.slice(2).concat(secondaryActions);
    primaryActions = primaryActions.slice(0, 2);
  }

  if (primaryActions.length === 0) {
    primaryActions = secondaryActions.slice(0, 1);
    secondaryActions = secondaryActions.slice(1);
  }

  return { primaryActions, secondaryActions };
}
