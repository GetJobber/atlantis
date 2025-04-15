import {
  type CommonAllowedElements,
  type CommonAtlantisProps,
  type GapSpacing,
} from "../sharedHelpers/types";

export interface CoverProps extends CommonAtlantisProps {
  readonly children: React.ReactNode;
  /** The minimum height of the element. Suggested to use `vh` units. */
  readonly minHeight?: string;
  /** The amount of space around the centered content */
  readonly gap?: GapSpacing;
  /** The HTML tag to render the container as. Defaults to `div`. */
  as?: CommonAllowedElements;

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

export interface CoverCenterContentProps extends CommonAtlantisProps {
  readonly children: React.ReactNode;
  readonly UNSAFE_className?: {
    centerContent?: string;
  };
  readonly UNSAFE_style?: {
    centerContent?: React.CSSProperties;
  };
  readonly as?: CommonAllowedElements;
}
