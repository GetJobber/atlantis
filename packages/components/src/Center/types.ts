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
export interface CenterProps {
  readonly children: React.ReactNode;

  /**
   * The alignment of the content.
   */
  readonly align?: "left" | "center" | "right";

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

  /**
   * Whether to instrictly center the content.
   */
  readonly intrinsic?: boolean;
}
