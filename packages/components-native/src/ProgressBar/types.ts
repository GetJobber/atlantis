import { ReactNode } from "react";

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
   * The number of items in progress (not completed, but to be less than the total)
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
}
