import {
  CommonAllowedElements,
  CommonAtlantisProps,
} from "../sharedHooks/types";

export interface CoverProps extends CommonAtlantisProps {
  readonly children: React.ReactNode;
  /** The minimum height of the element. Suggested to use `vh` units. */
  readonly minHeight?: string;
  /** The amount of space around the centered content */
  readonly gap?: string;
  /** The HTML tag to render the container as. Defaults to `div`. */
  as?: CommonAllowedElements;
}
