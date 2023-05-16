import React, { ReactNode, useEffect, useRef } from "react";
import { View, ViewStyle } from "react-native";
import { v4 } from "react-native-uuid";
import { useErrorMessageContext } from "./context";
import { styles } from "./ErrorMessageWrapper.style";
import { Icon } from "../Icon";
import { Text } from "../Text";

type WrapForTypes = "card" | "default";

interface ErrorMessageWrapperProps {
  /**
   * The message that shows up below the children
   */
  readonly message?: string;

  /**
   * Changes how it gets laid out on the UI
   */
  readonly wrapFor?: WrapForTypes;

  readonly children: ReactNode;
}

const wrapForStyle: Record<WrapForTypes, ViewStyle | undefined> = {
  card: styles.wrapForCard,
  default: undefined,
};

/**
 * Adds an error message below the children but ensure the message gets read
 * out first.
 *
 * This component is internal to Atlantis and shouldn't be used outside of it.
 */
export function ErrorMessageWrapper({
  message,
  wrapFor = "default",
  children,
}: ErrorMessageWrapperProps): JSX.Element {
  const errorMessageContext = useErrorMessageContext();
  const register = errorMessageContext?.register;
  const unregister = errorMessageContext?.unregister;
  const a11yMessageRef = useRef<View>(null);
  const { current: uuid } = useRef(v4());

  const hasErrorMessage = Boolean(message);

  useEffect(() => {
    if (register) {
      register({ id: uuid, ref: a11yMessageRef, hasErrorMessage });
    }

    if (unregister) {
      return () => unregister(uuid);
    }
  }, [uuid, hasErrorMessage, register, unregister]);

  return (
    <View style={[styles.wrapper]}>
      {hasErrorMessage && (
        <View
          ref={a11yMessageRef}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={message}
          pointerEvents="none"
          style={styles.screenReaderMessage}
        />
      )}

      {children}

      {hasErrorMessage && (
        <View style={[styles.messageWrapper, wrapForStyle[wrapFor]]}>
          <View style={styles.messageWrapperIcon}>
            <Icon name="alert" size="small" color="critical" />
          </View>
          <View style={styles.messageWrapperContent}>
            <Text variation="error" level="textSupporting" hideFromScreenReader>
              {message}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
