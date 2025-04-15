import { Spaces } from "../sharedHooks/useSpaces";
import { AtlantisBreakpoints } from "../sharedHooks/useBreakpoints";
import {
  CommonAllowedElements,
  CommonAtlantisProps,
} from "../sharedHooks/types";

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
  readonly align?: "start" | "end" | "center";

  /**
   * The amount of space between the cluster elements. Semantic tokens are available.
   */
  readonly gap?: Spaces | (string & NonNullable<unknown>);

  /**
   * The breakpoint below which the cluster will collapse.
   */
  readonly collapseBelow?: typeof AtlantisBreakpoints;

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
}
