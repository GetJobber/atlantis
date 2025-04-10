import { Breakpoints } from "@jobber/hooks/useResizeObserver";

export type Spaces =
  | "minuscule"
  | "smallest"
  | "smaller"
  | "small"
  | "base"
  | "large"
  | "larger"
  | "largest"
  | "extravagant";

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
}
