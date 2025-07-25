import { CSSProperties, ReactNode } from "react";
import { IconNames } from "@jobber/design";
import { ButtonProps } from "../Button";

export type BannerType = "notice" | "success" | "warning" | "error";

export interface BannerProps {
  readonly children: ReactNode;

  /**
   * Sets the status-based theme of the Banner
   */
  readonly type: BannerType;

  /**
   * Accepts props for Button. Default action uses a 'subtle' Button
   */
  readonly primaryAction?: ButtonProps;

  /**
   * Set to false to hide the dismiss button
   * @default true
   */
  readonly dismissible?: boolean;

  /**
   * Use to override the default status Icon
   */
  readonly icon?: IconNames;

  /**
   * Callback to be called when the Banner is dismissed.
   */
  onDismiss?(): void;

  /**
   * When provided, Banner's visibility is controlled by this value
   * @default undefined
   */
  readonly controlledVisiblity?: boolean;
}

export interface BannerProviderProps {
  /**
   * Sets the status-based theme of the Banner.
   */
  readonly type: BannerType;

  /**
   * When provided, Banner's visibility is controlled by this value.
   */
  readonly visible?: boolean;

  /**
   * Callback to be called when the Banner is dismissed.
   */
  readonly onDismiss?: () => void;

  /**
   * Icon to be used for the Banner.
   * If you want to remove the icon, set to false.
   * @default <Banner.Icon/>
   */
  readonly icon?: React.ReactNode;

  /**
   * Dismiss button to be used for the Banner.
   * If you want to remove the dismiss button, set to false.
   * @default <Banner.DismissButton/>
   */
  readonly dismissButton?: React.ReactNode;

  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    readonly container?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    readonly container?: CSSProperties;
  };
}
