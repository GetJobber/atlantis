import {
  CommonAllowedElements,
  CommonAtlantisProps,
} from "../sharedHelpers/types";

export interface FrameProps extends CommonAtlantisProps {
  readonly children: React.ReactNode;
  /** The horizontal (width) part of the aspect ratio */
  readonly aspectX?: number;
  /** The vertical (height) part of the aspect ratio */
  readonly aspectY?: number;
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
