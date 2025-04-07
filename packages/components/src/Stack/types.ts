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

export interface StackProps {
  readonly children: React.ReactNode;
  /** The amount of space between the children. Semantic tokens are available. */
  readonly space?: string | Spaces;
  /** The number of children to split the stack after. Requires parent to have height greater than the sum of the children. */
  readonly splitAfter?: number;
  /** Whether to recursively apply the stack spacing to all the children, not just the top-level. */
  readonly recursive?: boolean;
  /** The alignment of the stack. */
  readonly align?: "start" | "center" | "end";
}
