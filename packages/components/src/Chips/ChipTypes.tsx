import { KeyboardEvent, MouseEvent, ReactElement } from "react";
import { ChipButtonProps } from "./InternalChipButton";
import { AvatarProps } from "../Avatar";
import { IconProps } from "../Icon";

export interface InternalChipProps {
  /**
   * Adds the ability to control focus via tabindex
   */
  readonly tabIndex?: number;

  /**
   * Label of the chip.
   */
  readonly label: string;

  /**
   * Changes the style of the chip to look different than the default.
   */
  readonly active?: boolean;

  /**
   * Makes the chip look and feel uninteractable.
   */
  readonly disabled?: boolean;

  /**
   * Highlights the chip red.
   */
  readonly invalid?: boolean;

  /**
   * Adds an avatar or icon on the left side of the label.
   *
   * Size props on both components are overwritten on render.
   *
   * **Example**
   *```jsx
   * <Chip prefix={<Avatar initials="JBR" />} />
   * <Chip prefix={<Icon name="quote" />} />
   * ```
   */
  readonly prefix?: ReactElement<AvatarProps | IconProps>;

  /**
   * Adds a component on the right side of the label.
   */
  readonly suffix?: ReactElement<IconProps | ChipButtonProps>;

  /**
   * Callback when the chip itself gets clicked.
   */
  onClick?(
    event: MouseEvent<HTMLDivElement | HTMLInputElement | HTMLButtonElement>,
  ): void;

  /**
   * Callback for keyboard interaction with chips (e.g., chip deletion).
   */
  onKeyDown?(event: KeyboardEvent<HTMLDivElement | HTMLButtonElement>): void;
}
