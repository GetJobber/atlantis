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
export interface ContentBlockProps {
  readonly children: React.ReactNode;

  /**
   * The justification of the content.
   */
  readonly justify?: "left" | "center" | "right";

  /**
   * The maximum width of the centered content.
   */
  readonly maxWidth?:
    | typeof Breakpoints
    | (string & NonNullable<unknown>)
    | number;

  /**
   * Whether to also center the text.
   */
  readonly andText?: boolean;

  /**
   * The amount of space between the content and the edges of the container.
   */
  readonly gutters?: Spaces | (string & NonNullable<unknown>);
}
