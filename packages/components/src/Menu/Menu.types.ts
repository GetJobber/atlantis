import type { IconColorNames, IconNames } from "@jobber/design";
import type { CSSProperties, ReactElement, ReactNode } from "react";

export interface MenuProps {
  /**
   * Custom menu activator. If this is not provided a default [… More] will be used.
   */
  readonly activator?: ReactElement;
  /**
   * Collection of action items.
   */
  readonly items?: SectionProps[];

  /**
   * Composable children-based API. When provided, this takes precedence over `items`.
   */
  readonly children?: ReactNode;

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

export interface MenuComposableProps {
  readonly children: ReactNode;
  readonly UNSAFE_className?: {
    menu?: string;
  };
  readonly UNSAFE_style?: {
    menu?: CSSProperties;
  };
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

export interface MenuTriggerComposableProps extends React.PropsWithChildren {
  /**
   * Accessible name for the trigger. If trigger content is not plain text, this must be provided.
   */
  readonly ariaLabel?: string;
}

export interface MenuMobileUnderlayProps {
  readonly animation: "unmounted" | "hidden" | "visible";
}
