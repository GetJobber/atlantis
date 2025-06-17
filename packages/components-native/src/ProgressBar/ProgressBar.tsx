import React from "react";
import { View } from "react-native";
import { ProgressBarProps } from "./types";
import { useStyles } from "./ProgressBar.style";
import { ProgressBarInner, calculateWidth } from "./ProgressBarInner";
import { ProgressBarStepped } from "./ProgressBarStepped";
import { sizeStyles } from "./ProgressBar.size.style";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";
import { useAtlantisTheme } from "../AtlantisThemeContext";

export function ProgressBar({
  loading,
  total,
  current,
  inProgress = 0,
  reverseTheme = false,
  header,
  variation = "progress",
  size = "base",
}: ProgressBarProps): JSX.Element {
  const { t } = useAtlantisI18n();
  const styles = useStyles();
  const { tokens } = useAtlantisTheme();

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={getA11yLabel()}
    >
      {header}
      {variation === "stepped" ? (
        <ProgressBarStepped
          total={total}
          current={current}
          color={
            reverseTheme ? undefined : tokens["color-interactive--background"]
          }
          loading={loading}
          inProgress={inProgress}
        />
      ) : (
        <View style={[styles.progressBarContainer, sizeStyles[size]]}>
          <ProgressBarInner
            width={100}
            animationDuration={0}
            color={
              reverseTheme ? undefined : tokens["color-interactive--background"]
            }
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
      )}
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
