import type { IconColorNames, IconNames } from "@jobber/design";
import type React from "react";
import type { CSSProperties, ReactElement, ReactNode } from "react";

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

interface MenuHeaderDefaultPresentation {
  /**
   * Opinionated header label. When provided, renders with default typography.
   */
  readonly label: string;
  /**
   * Must not be provided when using default presentation
   */
  readonly customRender?: never;
}

interface MenuHeaderCustomPresentation {
  /**
   * Fully customize the header rendering. When provided, it takes full control.
   * You may use the provided `defaultContent` to re-use the opinionated header.
   */
  readonly customRender: () => ReactNode;
  /**
   * Must not be provided when using custom presentation
   */
  readonly label?: never;
}

export type MenuHeaderComposableProps = UnsafeProps &
  (MenuHeaderDefaultPresentation | MenuHeaderCustomPresentation);

interface MenuItemDefaultPresentation {
  /**
   * Opinionated item label.
   */
  readonly label: string;

  /**
   * Optional leading icon.
   */
  readonly icon?: IconNames;

  /**
   * Icon color. Defaults to "icon". If `destructive` is true, the icon
   * color will be forced to "destructive".
   */
  readonly iconColor?: IconColorNames;

  /**
   * Apply destructive styling to the item label and icon.
   */
  readonly destructive?: boolean;
  /**
   * Must not be provided when using default presentation
   */
  readonly customRender?: never;
}

interface MenuItemCustomPresentation {
  /**
   * Fully customize the item rendering. When provided, it takes full control.
   * You may use the provided `defaultContent` to re-use the opinionated item.
   */
  readonly customRender: () => ReactNode;
  /**
   * Must not be provided when using custom presentation
   */
  readonly label?: never;
  readonly icon?: never;
  readonly iconColor?: never;
  readonly destructive?: never;
}

type MenuItemBehaviorProps = UnsafeProps & {
  /*
   * Callback when an item is activated.
   * If href is provided, this will be ignored.
   */
  readonly onClick?: (event?: React.MouseEvent) => void;

  /**
   * String representation of the item's content.
   * Must be provided if the item's content is not plain text.
   */
  readonly textValue?: string;

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
};

export type MenuItemComposableProps = MenuItemBehaviorProps &
  (MenuItemDefaultPresentation | MenuItemCustomPresentation);

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
