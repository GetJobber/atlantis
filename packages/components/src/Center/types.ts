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
   * The maximum width of the centered content.
   */
  readonly max?: string;

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
