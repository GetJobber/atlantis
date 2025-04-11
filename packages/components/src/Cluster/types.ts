import { Breakpoints } from "@jobber/hooks/useResizeObserver";
import { Spaces } from "../sharedHooks/useSpaces";

export interface ClusterProps {
  readonly children: React.ReactNode;

  /**
   * The horizontal justification of the cluster elements.
   */
  readonly justify?: "start" | "end" | "center" | "between" | "around";

  /**
   * The vertical alignment of the cluster elements.
   */
  readonly align?: "start" | "end" | "center";

  /**
   * The amount of space between the cluster elements. Semantic tokens are available.
   */
  readonly space?: Spaces | (string & NonNullable<unknown>);

  /**
   * The breakpoint below which the cluster will collapse.
   */
  readonly collapseBelow?: typeof Breakpoints | (string & NonNullable<unknown>);

  /**
   * Enabling this prevents the cluster from taking 100% of the width of the parent and instead flows with the content.
   */
  autoWidth?: boolean;
}
