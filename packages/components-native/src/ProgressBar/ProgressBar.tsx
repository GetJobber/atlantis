import React from "react";
import { View } from "react-native";
import { ProgressBarProps } from "./types";
import { styles } from "./ProgressBar.style";
import { ProgressBarInner, calculateWidth } from "./ProgressBarInner";
import { tokens } from "../utils/design";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";

export function ProgressBar({
  loading,
  total,
  current,
  inProgress = 0,
  reverseTheme = false,
  header,
}: ProgressBarProps): JSX.Element {
  const { t } = useAtlantisI18n();

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={getA11yLabel()}
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

  function getA11yLabel(): string {
    const a11yLabelValues = {
      current: String(current),
      total: String(total),
      inProgress: String(inProgress),
    };

    if (inProgress) {
      return t("ProgressBar.inProgress", a11yLabelValues);
    }

    return t("ProgressBar.complete", a11yLabelValues);
  }
}
