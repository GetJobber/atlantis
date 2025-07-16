import { AtlantisBreakpoints } from "../sharedHelpers/getMappedBreakpointWidth";
import {
  type CommonAllowedElements,
  type CommonAtlantisProps,
  type GapSpacing,
} from "../sharedHelpers/types";

export interface ClusterProps extends CommonAtlantisProps {
  readonly children: React.ReactNode;

  /**
   * The horizontal justification of the cluster elements.
   */
  readonly justify?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around";

  /**
   * The vertical alignment of the cluster elements.
   */
  readonly align?: "start" | "end" | "center" | "stretch";

  /**
   * The amount of space between the cluster elements. Semantic tokens are available.
   */
  readonly gap?: GapSpacing;

  /**
   * The breakpoint below which the cluster will collapse.
   */
  readonly collapseBelow?: keyof typeof AtlantisBreakpoints;

  /**
   * Force the cluster to collapse. Use this when our breakpoints are not enough control.
   */
  readonly collapsed?: boolean;

  /**
   * Enabling this prevents the cluster from taking 100% of the width of the parent and instead flows with the content.
   */
  autoWidth?: boolean;

  /**
   * The HTML tag to render the cluster as.
   */
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
