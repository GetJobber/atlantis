import { ReactNode } from "react";
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

  onDismiss?(): void;

  /**
   * When provided, Banner's visibility is controlled by this value
   * @default undefined
   */
  readonly controlledVisiblity?: boolean;
}
