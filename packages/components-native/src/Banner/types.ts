import { IconNames } from "@jobber/design";
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
   * Custom content to be displayed in the banner
   */
  readonly children?: React.ReactElement | string;

  /**
   * **Deprecated**: Use `children` with a `<TextList level="textSupporting" />` instead
   * @deprecated
   */
  readonly details?: string[];

  /**
   * **Deprecated**: Use `children` instead
   * @deprecated
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
