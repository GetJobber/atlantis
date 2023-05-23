import { ViewStyle } from "react-native";

export type ColumnKeys = "shrink" | "grow";

export interface FlexProps {
  /**
   * Determine how the children gets laid out on the flex grid. If there are more
   * Children than elements in the template, it will render multiple rows.
   *
   * **Supported keys**
   * - `"grow"` - Grows to the space available. If all children are set to
   *   grow, then they'll have equal width.
   * - `"shrink"` - Shrinks to the smallest size possible. Normally the size of
   *   the child.
   *
   * By default, this will set every children to grow in equal widths.
   */
  readonly template?: ColumnKeys[];

  /**
   * It works the same way as `alignItems` style with flex.
   */
  readonly align?: ViewStyle["alignItems"];

  /**
   * The spacing between the children.
   */
  readonly gap?: Spacing;
}

export const spacing = [
  "none",
  "smallest",
  "smaller",
  "small",
  "base",
  "large",
] as const;

type ValuesOfSpacing<T extends typeof spacing> = T[number];
export type Spacing = ValuesOfSpacing<typeof spacing>;
