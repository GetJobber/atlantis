import { IconNames } from "@jobber/design";
import { XOR } from "ts-xor";
import { LinkProps } from "react-router-dom";
import {
  RouterNavigationPath,
  RouterOptions,
} from "./ButtonNavigationProvider";

export type ButtonType = "button" | "submit";

export interface ButtonFoundationProps {
  /**
   * Used for screen readers. Will override label on screen
   * reader if present.
   */
  readonly ariaLabel?: string;
  readonly ariaControls?: string;
  readonly ariaHaspopup?: boolean;
  readonly ariaExpanded?: boolean;
  readonly disabled?: boolean;
  readonly external?: boolean;
  readonly fullWidth?: boolean;
  readonly icon?: IconNames;
  readonly iconOnRight?: boolean;
  readonly id?: string;
  readonly label?: string;
  readonly loading?: boolean;
  readonly size?: "small" | "base" | "large";
  onClick?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
  onMouseDown?(
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void;
}

interface ButtonIconProps extends ButtonFoundationProps {
  readonly icon: IconNames;
  readonly ariaLabel: string;
}

interface ButtonLabelProps extends ButtonFoundationProps {
  readonly label: string;
}

interface ButtonAnchorProps<ClientSideRouting extends boolean>
  extends ButtonFoundationProps {
  /**
   * Provide the navigation path for the button. If useClientSideRouting is true, the button will use the router to navigate.
   */
  readonly url?: ClientSideRouting extends true ? RouterNavigationPath : string;
  /**
   * Determines if the button should use the router to navigate.
   */
  readonly useClientSideRouting?: ClientSideRouting;
  /**
   * Router options to be passed to the ButtonNavigationProvider when navigating.
   */
  readonly routerOptions?: RouterOptions;
}

interface ButtonLinkProps<S = unknown> extends ButtonFoundationProps {
  /**
   * **Deprecated**: to will be removed in the next major version
   * @deprecated
   */
  readonly to?: LinkProps<S>["to"];
}

interface BaseActionProps extends ButtonFoundationProps {
  readonly variation?: "work" | "learning" | "subtle" | "destructive";
  readonly type?: "primary" | "secondary" | "tertiary";
}

interface DestructiveActionProps extends ButtonFoundationProps {
  readonly variation: "destructive";
  readonly type?: "primary" | "secondary" | "tertiary";
}

interface SubmitActionProps
  extends Omit<BaseActionProps, "external" | "onClick"> {
  readonly name?: string;
  readonly submit: boolean;
  readonly type?: "primary" | "secondary" | "tertiary";
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

export type ButtonProps<ClientSideRouting extends boolean = false> = XOR<
  BaseActionProps,
  XOR<DestructiveActionProps, SubmitActionProps>
> &
  XOR<
    XOR<SubmitButtonProps, BasicButtonProps>,
    XOR<ButtonLinkProps, ButtonAnchorProps<ClientSideRouting>>
  > &
  XOR<ButtonIconProps, ButtonLabelProps>;
