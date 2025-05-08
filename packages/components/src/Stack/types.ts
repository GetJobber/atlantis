import {
  type CommonAllowedElements,
  type CommonAtlantisProps,
  type GapSpacing,
} from "../sharedHelpers/types";

export interface StackProps extends CommonAtlantisProps {
  readonly children: React.ReactNode;
  /** The amount of space between the children. Semantic tokens are available. */
  readonly gap?: GapSpacing;
  /** Setting this will push the stack down to the bottom of the parent container,
   * after the number of children provided (1-15).
   * Requires parent to have height greater than the sum of the children. */
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
  /** Element to divide the stack with. */
  divider?: React.ReactNode;
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
