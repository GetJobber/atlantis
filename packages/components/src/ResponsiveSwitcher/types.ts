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

export interface ResponsiveSwitcherProps {
  readonly children: React.ReactNode;

  /** The minimum width of the top-level children. If this can't be met, the children will break to row. */
  readonly threshold: string;

  /** The amount of space between the children. Semantic tokens are available. */
  readonly space?: Spaces | (string & NonNullable<unknown>);

  /** Useful for dynamic content. If the number of children is greater than this, the children will break to row. */
  readonly limit?: number;
}
