import { Breakpoints } from "@jobber/hooks/useResizeObserver";
import { Spaces } from "../sharedHooks/useSpaces";
import {
  CommonAllowedElements,
  CommonAtlantisProps,
} from "../sharedHooks/types";

export interface ContentBlockProps extends CommonAtlantisProps {
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

  /** The HTML tag to render the container as. Defaults to `div`. */
  as?: CommonAllowedElements;
}
