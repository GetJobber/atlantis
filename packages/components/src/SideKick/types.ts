import { AtlantisBreakpoints } from "../sharedHelpers/getMappedBreakpointWidth";
import {
  type CommonAllowedElements,
  type CommonAtlantisProps,
  type GapSpacing,
} from "../sharedHelpers/types";

export interface SideKickProps extends CommonAtlantisProps {
  readonly children: React.ReactNode;
  /** The width of the sidekick. */
  readonly sideWidth?: string;
  /** The minimum width of the content. */
  readonly contentMinWidth?: string;
  /** The amount of space between the sidekick and the content. Semantic tokens are available. */
  readonly gap?: GapSpacing;
  /** Whether to place the sidekick on the right. */
  readonly onRight?: boolean;
  /** The breakpoint to collapse the sidekick at. */
  readonly collapseBelow?: keyof typeof AtlantisBreakpoints;
  /** Force the sidekick to collapse. Use this when our breakpoints are not enough control. */
  readonly collapsed?: boolean;
  /** Whether to allow the sidekick to take the width of the content. Defaults to 100% */
  readonly autoWidth?: boolean;
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
