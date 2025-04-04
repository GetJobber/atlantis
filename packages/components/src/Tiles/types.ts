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

export interface TilesProps {
  readonly children: React.ReactNode;
  /** The minimum size of the tiles. */
  readonly minSize: string;
  /** The amount of space between the tiles. Semantic tokens are available. */
  readonly space: string | Spaces;
}
