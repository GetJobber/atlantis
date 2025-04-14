import { Spaces } from "../sharedHooks/useSpaces";

export interface StackProps {
  readonly children: React.ReactNode;
  /** The amount of space between the children. Semantic tokens are available. */
  readonly gap?: string | Spaces;
  /** The number of children to split the stack after (1-15). Requires parent to have height greater than the sum of the children. */
  readonly splitAfter?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15;

  /** Whether to recursively apply the stack spacing to all the children, not just the top-level. */
  readonly recursive?: boolean;
  /** The alignment of the stack. */
  readonly align?: "start" | "center" | "end";
  /** Whether to allow the stack to take the width of the content. Defaults to 100% */
  readonly autoWidth?: boolean;
}
