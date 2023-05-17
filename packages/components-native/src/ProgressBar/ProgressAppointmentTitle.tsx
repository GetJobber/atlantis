import { useIntl } from "react-intl";
import React from "react";
import { View } from "react-native";
import { Heading } from "atlantis/Heading";
import { Text } from "atlantis/Text";
import { messages } from "./messages";
import { ProgressBarProps } from "./types";
import { styles } from "./ProgressBar.style";

interface ProgressAppointmentTitleProps
  extends Pick<ProgressBarProps, "total" | "current" | "reverseTheme"> {
  /**
   * States the current amount accumulated due to completion
   */
  readonly amountFormatted?: string;

  /**
   * States the total amount which will be achieved after all of the tasks have been completed
   */
  readonly totalAmountFormatted?: string;
}

export function ProgressAppointmentTitle({
  total,
  current,
  amountFormatted,
  totalAmountFormatted,
  reverseTheme,
}: ProgressAppointmentTitleProps): JSX.Element {
  const { formatMessage } = useIntl();
  if (current >= 1 && current < total) {
    return (
      <View style={styles.spacedContent}>
        <Heading level="subHeading" reverseTheme={reverseTheme}>
          {formatMessage(messages.visitsComplete, {
            title: `${current} ${current > 1 ? "visits" : "visit"} completed`,
          })}
        </Heading>
        <Text reverseTheme={reverseTheme}>
          {amountFormatted &&
            totalAmountFormatted &&
            `${amountFormatted} of ${totalAmountFormatted}`}
        </Text>
      </View>
    );
  } else if (current >= 1 && current >= total) {
    return (
      <View style={styles.centeredContent}>
        <Heading level="subHeading" reverseTheme={reverseTheme}>
          {formatMessage(messages.allVisitsCompleted)}
        </Heading>
      </View>
    );
  } else {
    return (
      <View style={styles.centeredContent}>
        <Heading level="subHeading" reverseTheme={reverseTheme}>
          {formatMessage(messages.noVisitsCompleted)}
        </Heading>
      </View>
    );
  }
}
