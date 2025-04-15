import {
  CommonAllowedElements,
  CommonAtlantisProps,
} from "../sharedHooks/types";

export interface FrameProps extends CommonAtlantisProps {
  readonly children: React.ReactNode;
  /** The horizontal (width) part of the aspect ratio */
  readonly aspectX?: number;
  /** The vertical (height) part of the aspect ratio */
  readonly aspectY?: number;
  /** The HTML tag to render the container as. Defaults to `div`. */
  as?: CommonAllowedElements;
}
