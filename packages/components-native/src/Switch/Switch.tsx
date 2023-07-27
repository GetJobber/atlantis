import React, { useState } from "react";
import { View } from "react-native";
import { XOR } from "ts-xor";
import { BaseSwitch, BaseSwitchProps } from "./components/BaseSwitch";
import { styles } from "./Switch.styles";
import { Text } from "../Text";

interface WithLabelProps extends BaseSwitchProps {
  /**
   * Optional label to display in front of the switch
   */
  readonly label: string;

  /**
   * Optional descriptive text to display under the switch
   */
  readonly description?: string;
}

export type SwitchProps = XOR<BaseSwitchProps, WithLabelProps>;

export function Switch(props: SwitchProps): JSX.Element {
  const switchProps: SwitchProps = {
    ...props,
    accessibilityLabel: props.accessibilityLabel || props.label,
  };

  const [labelWidth, setLabelWidth] = useState<number | undefined>();
  console.warn({ BaseSwitch });
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {props.label && (
          <View
            style={styles.label}
            onLayout={event => setLabelWidth(event.nativeEvent.layout.width)}
            testID="switch-label-view"
          >
            <Text variation={props.disabled ? "disabled" : "base"}>
              {props.label}
            </Text>
          </View>
        )}
        <BaseSwitch {...switchProps} />
      </View>
      {props.description && (
        <View
          style={[styles.description, { maxWidth: labelWidth }]}
          testID="switch-description-view"
        >
          <Text level="textSupporting" variation="subdued">
            {props.description}
          </Text>
        </View>
      )}
    </View>
  );
}
