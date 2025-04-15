import {
  CommonAllowedElements,
  CommonAtlantisProps,
  GapSpacing,
} from "../sharedHelpers/types";
import { AtlantisBreakpoints } from "../sharedHelpers/getMappedBreakpointWidth";

export interface ContentBlockProps extends CommonAtlantisProps {
  readonly children: React.ReactNode;

  /**
   * The justification of the content.
   */
  readonly justify?: "left" | "center" | "right";

  /**
   * The maximum width of the centered content.
   */
  readonly maxWidth?:
    | keyof typeof AtlantisBreakpoints
    | (string & NonNullable<unknown>)
    | number;

  /**
   * Whether to also center the text.
   */
  readonly andText?: boolean;

  /**
   * The amount of space between the content and the edges of the container.
   */
  readonly gutters?: GapSpacing;

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
