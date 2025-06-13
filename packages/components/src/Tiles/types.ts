import {
  type CommonAllowedElements,
  type CommonAtlantisProps,
  type GapSpacing,
} from "../sharedHelpers/types";

export interface TilesProps extends CommonAtlantisProps {
  readonly children: React.ReactNode;
  /** The minimum size of the tiles.
   * @default "30ch"
   */
  readonly minSize?: string;
  /** The amount of space between the tiles. Semantic tokens are available.
   * @default "base"
   */
  readonly gap?: GapSpacing;
  /** Whether to allow the tiles to take the width of the content. Defaults to 100% */
  readonly autoWidth?: boolean;
  /** The HTML tag to render the container as. Defaults to `div`. */
  as?: CommonAllowedElements;

  /** The vertical alignment  of the tiles within the container.
   * @default "start"
   */
  readonly align?: "start" | "center" | "end";

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
