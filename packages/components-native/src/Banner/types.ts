import { IconNames } from "@jobber/design";
import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type BannerTypes = "error" | "warning" | "notice";

export interface BannerStyleProps {
  /**
   * Styles applied to the main view of the banner. Styles are grabbed from Banner.style.ts file
   */
  readonly styles: StyleProp<ViewStyle>;
}

interface ActionProps {
  /**
   * The function that should be performed when the Banner is pressed
   */
  readonly onPress: () => void;

  /**
   * Helper text displayed for press action
   */
  readonly label: string;
}

export interface BannerProps {
  /**
   * The function that should be performed when the Banner is pressed
   */
  readonly action?: ActionProps;

  /**
   * Custom content which will be displayed above the 'details' prop
   */
  readonly children?: ReactNode;

  /**
   * Text to display below 'children'. Can be a single message or bullet points of messages if multiple are provided
   */
  readonly details?: string[];

  /**
   * @deprecated Use `children` instead
   */
  readonly text?: string;

  /**
   * The primary theme of the banner, controls the things like the background color
   */
  readonly type: BannerTypes;

  /**
   * Adds an icon to the left of the banner content
   */
  readonly icon?: IconNames;
}
