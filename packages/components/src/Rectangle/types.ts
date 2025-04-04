import { semantic } from "@jobber/design";

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

export type SemanticColors = keyof typeof semantic;

export interface RectangleProps {
  readonly children: React.ReactNode;
  /** The amount of space around the rectangle. Semantic tokens are available. */
  readonly padding?:
    | Spaces
    | { x?: string; y?: string }
    | (string & NonNullable<unknown>);
  /** The width of the border. Semantic tokens are available. */
  readonly borderWidth?: Spaces | (string & NonNullable<unknown>);
  /** The color of the surface. Semantic tokens are available. */
  readonly colorSurface?: SemanticColors | (string & NonNullable<unknown>);
  /** The color of the inverse. Semantic tokens are available. */
  readonly colorInverse?: SemanticColors | (string & NonNullable<unknown>);
  /** Whether to invert the colors. */
  readonly invert?: boolean;
  /** Whether to force the text color to inherit from the parent. Enabled by default. */
  readonly textColor?: boolean;
}
