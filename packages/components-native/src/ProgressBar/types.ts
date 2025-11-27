import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface ProgressBarProps {
  /**
   * The total number of items to be completed
   */
  readonly total: number;

  /**
   * The number of items that are currently completed
   */
  readonly current: number;

  /**
   * The number of items in progress (not completed, but to be less than the total);
   * not applicable with stepped variation
   */
  readonly inProgress?: number;

  /**
   * If the progress bar is loading, the progress indicators aren't rendered on the screen
   */
  readonly loading?: boolean;

  /**
   * If the amountFormatted and totalAmountFormatted text needs to appear more visibile because of the
   * background, for example
   */
  readonly reverseTheme?: boolean;

  /**
   * Component to render above the progress bar.
   */
  readonly header?: ReactNode;

  /**
   * Set the variation of the progress bar
   * @default progress
   */
  readonly variation?: "progress" | "stepped";

  /**
   * Set the size of the progress bar
   * @default base
   */
  readonly size?: "smaller" | "small" | "base";

  /** **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: ProgressBarUnsafeStyle;
}

export interface ProgressBarUnsafeStyle {
  container?: StyleProp<ViewStyle>;
  progressBarContainer?: StyleProp<ViewStyle>;
  step?: StyleProp<ViewStyle>;
  /** Track/background bar in 'progress' variation (full-width inner) */
  track?: StyleProp<ViewStyle>;
  /** Filled/completed portion in 'progress' variation */
  fill?: StyleProp<ViewStyle>;
  /** In-progress overlay portion in 'progress' variation */
  inProgressFill?: StyleProp<ViewStyle>;
}
