import { Spaces } from "../sharedHooks/useSpaces";
import { AtlantisBreakpoints } from "../sharedHooks/useBreakpoints";
import {
  CommonAllowedElements,
  CommonAtlantisProps,
} from "../sharedHooks/types";

export interface SideKickProps extends CommonAtlantisProps {
  readonly children: React.ReactNode;
  /** The width of the sidekick. */
  readonly sideWidth?: string;
  /** The minimum width of the content. */
  readonly contentMinWidth?: string;
  /** The amount of space between the sidekick and the content. Semantic tokens are available. */
  readonly gap?: string | Spaces;
  /** Whether to place the sidekick on the right. */
  readonly onRight?: boolean;
  /** The breakpoint to collapse the sidekick at. */
  readonly collapseBelow?: keyof typeof AtlantisBreakpoints;
  /** Force the sidekick to collapse. Use this when our breakpoints are not enough control. */
  readonly collapsed?: boolean;
  /** Whether to allow the sidekick to take the width of the content. Defaults to 100% */
  readonly autoWidth?: boolean;
  /** The HTML tag to render the container as. Defaults to `div`. */
  as?: CommonAllowedElements;
}
