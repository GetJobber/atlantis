import { IconNames } from "@jobber/design";
import { LinkProps } from "react-router-dom";
import { XOR } from "ts-xor";
import { CSSProperties } from "react";
import { TypographyProps } from "../Typography/Typography";
import { IconProps } from "../Icon/Icon";

export type HTMLButtonType = "button" | "submit";
export type ButtonVariation = "work" | "learning" | "subtle" | "destructive";
export type ButtonSize = "small" | "base" | "large";
export type ButtonType = "primary" | "secondary" | "tertiary";

export interface ButtonCommonProps {
  /**
   * Used for screen readers. Will override label on screen
   * reader if present.
   */
  readonly ariaControls?: string;
  readonly ariaHaspopup?: boolean;
  readonly ariaExpanded?: boolean;
  readonly disabled?: boolean;
  readonly external?: boolean;
  readonly fullWidth?: boolean;
  readonly id?: string;
  readonly loading?: boolean;
  readonly size?: ButtonSize;
  readonly ariaLabel?: string;
  readonly icon?: IconNames;
  readonly iconOnRight?: boolean;
  readonly label?: string;
  readonly variation?: ButtonVariation;
  readonly type?: ButtonType;
  readonly role?: string;
  readonly submit?: boolean;
  readonly value?: string;
  readonly name?: string;
  readonly children?: React.ReactNode;

  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * **Note:** If you are applying fill override to buttonIcon.path, you will need to add !important due
   * to Button's children element css inheritance.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    container?: string;
    buttonLabel?: TypographyProps["UNSAFE_className"];
    buttonIcon?: IconProps["UNSAFE_className"];
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * **Note:** If you are applying fill override to buttonIcon.path, you will need to add !important due
   * to Button's children element css inheritance.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    container?: CSSProperties;
    buttonLabel?: TypographyProps["UNSAFE_style"];
    buttonIcon?: IconProps["UNSAFE_style"];
  };
}

export interface ButtonButtonProps extends ButtonCommonProps {
  readonly url?: never;
  readonly to?: never;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  onMouseDown?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export interface ButtonAnchorProps extends ButtonCommonProps {
  readonly url: string;
  readonly to?: never;
  onClick?(event: React.MouseEvent<HTMLAnchorElement>): void;
  onMouseDown?(event: React.MouseEvent<HTMLAnchorElement>): void;
}

export interface ButtonLinkProps<S = unknown> extends ButtonCommonProps {
  readonly to: LinkProps<S>["to"];
  readonly url?: never;
  onClick?(event: React.MouseEvent<HTMLAnchorElement>): void;
  onMouseDown?(event: React.MouseEvent<HTMLAnchorElement>): void;
}

export interface ButtonFoundationProps extends ButtonCommonProps {
  onClick?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
  onMouseDown?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
}

interface ButtonNonComposableProps extends ButtonFoundationProps {
  readonly icon?: IconNames;
  readonly iconOnRight?: boolean;
  readonly label?: string;
}

interface ButtonIconProps extends ButtonNonComposableProps {
  readonly icon: IconNames;
  readonly ariaLabel: string;
}

interface ButtonLabelProps extends ButtonNonComposableProps {
  readonly label: string;
}

interface BaseActionProps extends ButtonFoundationProps {
  readonly variation?: ButtonVariation;
  readonly type?: ButtonType;
}

interface DestructiveActionProps extends ButtonFoundationProps {
  readonly variation: Extract<ButtonVariation, "destructive">;
  readonly type?: ButtonType;
}

interface SubmitActionProps
  extends Omit<BaseActionProps, "external" | "onClick"> {
  readonly name?: string;
  readonly submit: boolean;
  readonly type?: ButtonType;
  readonly value?: string;
}

interface SubmitButtonProps
  extends Omit<ButtonFoundationProps, "external" | "onClick"> {
  /**
   * Allows the button to submit a form
   */
  submit: boolean;
}

interface BasicButtonProps extends ButtonFoundationProps {
  /**
   * Used to override the default button role.
   */
  readonly role?: string;
}

type BaseButtonProps = XOR<
  BaseActionProps,
  XOR<DestructiveActionProps, SubmitActionProps>
> &
  XOR<
    XOR<SubmitButtonProps, BasicButtonProps>,
    XOR<ButtonLinkProps, ButtonAnchorProps>
  >;

export type ButtonWithChildrenProps = BaseButtonProps & {
  readonly children: React.ReactNode;
};

export type ButtonWithoutChildrenProps = BaseButtonProps &
  XOR<ButtonIconProps, ButtonLabelProps> & {
    readonly children?: never;
  };

export type ButtonProps =
  | ButtonButtonProps
  | ButtonAnchorProps
  | ButtonLinkProps
  | ButtonWithChildrenProps
  | ButtonWithoutChildrenProps;
