import { Match } from "autolinker";
import { TextProps } from "react-native";

export interface AutoLinkProps extends Pick<TextProps, "selectable"> {
  /**
   * Text to display.
   */
  readonly children: string;

  /**
   * Flag for linking phone numbers in text
   */
  readonly phone?: boolean;

  /**
   * Flag for linking emails in text
   */
  readonly email?: boolean;

  /**
   * Flag for linking urls in text
   */
  readonly urls?: boolean;

  /**
   * Determines the placement of the toast that gets shown onLongPress
   */
  readonly bottomTabsVisible?: boolean;
}

export type LinkType = "email" | "phone" | "url";

export interface ComposeTextWithLinksProps {
  part: string;
  index: number;
  match: Match;
  bottomTabsVisible: boolean;
  selectable?: boolean;
}
