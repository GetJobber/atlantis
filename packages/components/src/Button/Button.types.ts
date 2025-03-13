import { IconNames } from "@jobber/design";
import { LinkProps } from "react-router-dom";
import { XOR } from "ts-xor";

export type HTMLButtonType = "button" | "submit";
export type ButtonVariation = "work" | "learning" | "subtle" | "destructive";
export type ButtonSize = "small" | "base" | "large";
export type ButtonType = "primary" | "secondary" | "tertiary";

export interface ButtonFoundationProps {
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
  onClick?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
  onMouseDown?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
}

interface ButtonNonComposableProps extends ButtonFoundationProps {
  readonly ariaLabel?: string;
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

interface ButtonAnchorProps extends ButtonFoundationProps {
  /**
   * Used to create an 'href' on an anchor tag.
   */
  readonly url?: string;
}

interface ButtonLinkProps<S = unknown> extends ButtonFoundationProps {
  /**
   * **Deprecated**: to will be removed in the next major version
   * @deprecated
   */
  readonly to?: LinkProps<S>["to"];
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

export type ButtonProps = XOR<
  ButtonWithChildrenProps,
  ButtonWithoutChildrenProps
>;
