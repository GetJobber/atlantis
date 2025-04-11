import { Spaces } from "../sharedHooks/useSpaces";

export interface SideKickProps {
  readonly children: React.ReactNode;
  /** The width of the sidekick. */
  readonly sideWidth?: string;
  /** The minimum width of the content. */
  readonly contentMinWidth?: string;
  /** The amount of space between the sidekick and the content. Semantic tokens are available. */
  readonly space?: string | Spaces;
  /** Whether to place the sidekick on the right. */
  readonly onRight?: boolean;
  /** The breakpoint to collapse the sidekick at. */
  readonly collapseBelow?: string;
}
