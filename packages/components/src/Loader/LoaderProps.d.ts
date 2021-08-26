import { XOR } from "ts-xor";

export type LoaderProps = XOR<BaseLoaderProps, DeterminateLoaderProps>;

interface BaseLoaderProps {
  /**
   * Removes the overlay and has the component render in the flow of the layout
   * @default false
   */
  readonly inline?: boolean;

  /**
   * Shows a spinner when false, progress bar when true.
   * @default false
   */
  determinate?: boolean;

  /**
   * Show loading wrapper if underlying content is loading.
   * @default false
   */
  loading: boolean;
}

interface DeterminateLoaderProps extends BaseLoaderProps {
  determinate: true;

  /**
   * The determinate loading progress
   * @default 0
   */
  currentValue: number;

  /**
   * The determinate loading value when loading is completed
   * @default 100
   */
  maxValue?: number;
}
