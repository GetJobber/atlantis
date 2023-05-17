import React from "react";
import { View } from "react-native";
import { useIntl } from "react-intl";
import { ProgressBarProps } from "./types";
import { styles } from "./ProgressBar.style";
import { ProgressBarInner, calculateWidth } from "./ProgressBarInner";
import { messages } from "./messages";
import { tokens } from "../utils/design";

export function ProgressBar({
  loading,
  total,
  current,
  inProgress = 0,
  reverseTheme = false,
  header,
}: ProgressBarProps): JSX.Element {
  const { formatMessage } = useIntl();
  const accessibilityLabel = [];
  accessibilityLabel.push(formatMessage(messages.complete, { current, total }));
  inProgress &&
    accessibilityLabel.push(formatMessage(messages.inProgress, { inProgress }));

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel.join(", ")}
    >
      {header}
      <View style={styles.progressBarContainer}>
        <ProgressBarInner
          width={100}
          animationDuration={0}
          color={reverseTheme ? undefined : tokens["color-surface--background"]}
        />
        {!loading && (
          <>
            {inProgress && inProgress > 0 ? (
              <ProgressBarInner
                width={calculateWidth(total, current + inProgress)}
                color={tokens["color-informative"]}
                animationDuration={800}
              />
            ) : (
              <></>
            )}
            <ProgressBarInner
              width={calculateWidth(total, current)}
              color={tokens["color-interactive"]}
              animationDuration={600}
            />
          </>
        )}
      </View>
    </View>
  );
}
