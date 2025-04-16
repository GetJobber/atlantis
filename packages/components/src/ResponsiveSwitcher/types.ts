import {
  type CommonAllowedElements,
  type CommonAtlantisProps,
  type GapSpacing,
} from "../sharedHelpers/types";

export interface ResponsiveSwitcherProps extends CommonAtlantisProps {
  readonly children: React.ReactNode;

  /** The minimum width of the top-level children. If this can't be met, the children will break to row. */
  readonly threshold: string;

  /** The amount of space between the children. Semantic tokens are available. */
  readonly gap?: GapSpacing;

  /** The HTML tag to render the container as. Defaults to `div`. */
  as?: CommonAllowedElements;

  /** Useful for dynamic content. If the number of children is greater than this, the children will break to row. */
  readonly limit?: number;

  /** **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    container?: string;
  };
  /** **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    container?: React.CSSProperties;
  };
}
