import type { IconColorNames, IconNames } from "@jobber/design";
import type React from "react";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import type { IconProps } from "../Icon";

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
   * Used to make the menu a Controlled Component.
   */
  readonly open?: boolean;

  /**
   * This sets the default open state of the menu.
   * By default the menu is closed.
   * For use when the component is being used as an Uncontrolled Component.
   */
  readonly defaultOpen?: boolean;

  /**
   * Callback when the menu is opened or closed
   */
  readonly onOpenChange?: (isOpen: boolean) => void;
}

/**
 * Backwards-compatible props for the items-based Menu API.
 * Existing imports of `MenuProps` will continue to refer to the legacy shape.
 */
export type MenuProps = MenuLegacyProps;

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

interface UnsafeProps {
  readonly UNSAFE_style?: CSSProperties;
  readonly UNSAFE_className?: string;
}

export interface MenuSectionComposableProps extends UnsafeProps {
  /**
   * Section content
   * If no Menu.Header is provided, ariaLabel must be provided to identify the section to assistive technologies
   */
  readonly children: ReactNode;
  /**
   * Accessible label for the section
   */
  readonly ariaLabel?: string;
}

export interface MenuHeaderComposableProps extends UnsafeProps {
  readonly children: ReactNode;
}

export interface MenuItemComposableProps extends UnsafeProps {
  /**
   * Apply destructive styling to the item label and icon.
   */
  readonly destructive?: boolean;

  /**
   * Item content.
   */
  readonly children: ReactNode;

  /*
   * Callback when an item is activated.
   * If href is provided, this will be ignored.
   */
  readonly onClick?: (event?: React.MouseEvent) => void;

  /**
   * String representation of the item's content.
   * Required for typeahead functionality.
   */
  readonly textValue: string;

  /**
   * Href for the item. When provided, renders as a link item.
   */
  readonly href?: string;

  /**
   * Target window for the link.
   */
  readonly target?: string;

  /**
   * Rel attribute for the link.
   */
  readonly rel?: string;
}

export interface MenuItemIconComposableProps extends IconProps {}

export interface MenuContentComposableProps extends UnsafeProps {
  readonly children: ReactNode;
}

export interface MenuTriggerComposableProps {
  /**
   * Accessible name for the trigger.
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

export interface MenuSeparatorComposableProps extends UnsafeProps {}

export type AnimationState = "unmounted" | "hidden" | "visible";
export interface MenuMobileUnderlayProps {
  readonly animation: AnimationState;
}
