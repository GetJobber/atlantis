import type { IconColorNames, IconNames } from "@jobber/design";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import type { XOR } from "ts-xor";

export interface MenuLegacyProps extends MenuBaseProps {
  /**
   * Custom menu activator. If this is not provided a default [… More] will be used.
   */
  readonly activator?: ReactElement;
  /**
   * Collection of action items.
   */
  readonly items: SectionProps[];
}

interface MenuBaseProps {
  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    menu?: string;
    header?: string;
    action?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    menu?: CSSProperties;
    header?: CSSProperties;
    action?: CSSProperties;
  };
}

export interface MenuComposableProps extends MenuBaseProps {
  /**
   * Composable children-based API.
   * The first child must be the Menu.Trigger
   * The second child must be the Menu.Content
   */
  readonly children: ReactNode;
  /**
   * Callback when the menu is opened or closed
   */
  readonly onOpenChange?: (isOpen: boolean) => void;
}

export type MenuProps = XOR<MenuLegacyProps, MenuComposableProps>;

export interface SectionProps {
  /**
   * Defines the section header to further explain the group of actions.
   */
  header?: string;

  /**
   * List of actions.
   */
  actions: ActionProps[];
}

export interface SectionHeaderProps {
  readonly text: string;
  readonly UNSAFE_style?: CSSProperties;
  readonly UNSAFE_className?: string;
}

export interface ActionProps {
  /**
   * Action label
   */
  readonly label: string;

  /**
   * Parent Section Label
   */
  readonly sectionLabel?: string;

  /**
   * Visual cue for the action label
   */
  readonly icon?: IconNames;

  /**
   * Color for the icon. Defaults to "icon".
   */
  readonly iconColor?: IconColorNames;

  /**
   * Visual style for the action button
   */
  readonly destructive?: boolean;

  /**
   * Inline style overrides for the action button
   */
  readonly UNSAFE_style?: CSSProperties;

  /**
   * Style class overrides for the action button
   */
  readonly UNSAFE_className?: string;

  /**
   * Callback when an action gets clicked
   */
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export interface MenuSectionComposableProps {
  readonly children: ReactNode;
}

export interface MenuHeaderComposableProps {
  readonly children: ReactNode;
}

export interface MenuItemComposableProps {
  /*
   * Callback when an item gets clicked, or activated with Space or Enter
   */
  readonly onClick?: () => void;

  /**
   * Menu item content
   */
  readonly children: ReactNode;
}

export interface MenuContentComposableProps {
  readonly children: ReactNode;
  readonly placement?: string | null;
}

export interface MenuTriggerComposableProps {
  /**
   * Accessible name for the trigger. If trigger content is not plain text, this must be provided.
   */
  readonly ariaLabel?: string;
  /**
   * Trigger content.
   * This MUST be an interactive element, such as Button. Note that any onClick is ignored.
   * If you want to access the open event, use the onOpenChange on the Menu component.
   * If it does not have an interactive role, or a focus style it will have issues.
   */
  readonly children: ReactNode;
}

export interface MenuMobileUnderlayProps {
  readonly animation: "unmounted" | "hidden" | "visible";
}
