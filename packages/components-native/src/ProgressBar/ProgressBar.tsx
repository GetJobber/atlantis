import React from "react";
import { View } from "react-native";
import type { ProgressBarProps } from "./types";
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
  UNSAFE_style,
}: ProgressBarProps) {
  const { t } = useAtlantisI18n();
  const styles = useStyles();
  const { tokens } = useAtlantisTheme();

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={getA11yLabel()}
      style={UNSAFE_style?.container}
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
          UNSAFE_style={UNSAFE_style}
        />
      ) : (
        <View
          testID="progressbar-container"
          style={[
            styles.progressBarContainer,
            sizeStyles[size],
            UNSAFE_style?.progressBarContainer,
          ]}
        >
          <ProgressBarInner
            testID="progressbar-track"
            width={100}
            animationDuration={0}
            color={
              reverseTheme ? undefined : tokens["color-interactive--background"]
            }
            style={UNSAFE_style?.track}
          />
          {!loading && (
            <>
              {inProgress && inProgress > 0 ? (
                <ProgressBarInner
                  testID="progressbar-inprogress"
                  width={calculateWidth(total, current + inProgress)}
                  color={tokens["color-informative"]}
                  animationDuration={800}
                  style={UNSAFE_style?.inProgressFill}
                />
              ) : (
                <></>
              )}
              <ProgressBarInner
                testID="progressbar-fill"
                width={calculateWidth(total, current)}
                color={tokens["color-interactive"]}
                animationDuration={600}
                style={UNSAFE_style?.fill}
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
