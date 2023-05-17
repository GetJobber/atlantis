import React from "react";
import { View } from "react-native";
import { useIntl } from "react-intl";
import { JobberStyle } from "design/mobile-foundation";
import { ProgressBarProps } from "./types";
import { styles } from "./ProgressBar.style";
import { ProgressBarInner, calculateWidth } from "./ProgressBarInner";
import { messages } from "./messages";

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
          color={
            reverseTheme ? undefined : JobberStyle["color-surface--background"]
          }
        />
        {!loading && (
          <>
            {inProgress && inProgress > 0 ? (
              <ProgressBarInner
                width={calculateWidth(total, current + inProgress)}
                color={JobberStyle["color-informative"]}
                animationDuration={800}
              />
            ) : (
              <></>
            )}
            <ProgressBarInner
              width={calculateWidth(total, current)}
              color={JobberStyle["color-interactive"]}
              animationDuration={600}
            />
          </>
        )}
      </View>
    </View>
  );
}
