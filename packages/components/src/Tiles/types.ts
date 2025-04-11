import { Spaces } from "../sharedHooks/useSpaces";

export interface TilesProps {
  readonly children: React.ReactNode;
  /** The minimum size of the tiles. */
  readonly minSize: string;
  /** The amount of space between the tiles. Semantic tokens are available. */
  readonly space: string | Spaces;
  /** Whether to allow the tiles to take the width of the content. Defaults to 100% */
  readonly autoWidth?: boolean;
}
