import type { IconColorNames, IconNames } from "@jobber/design";
import type React from "react";
import type {
  ActionListHeaderProps,
  ActionListItemIconProps,
  ActionListItemLabelProps,
  ActionListItemProps,
  ActionListRootProps,
  ActionListSectionProps,
  ActionListSeparatorProps,
} from "../private/styledPrimitives/ActionList/ActionList.types";

export interface MenuLegacyProps extends MenuBaseProps {
  readonly activator?: React.ReactElement<{
    fullWidth?: boolean;
    onClick?: (event?: React.MouseEvent) => void;
    [key: string]: unknown;
  }>;
  readonly items: SectionProps[];
}

interface MenuBaseProps {
  readonly UNSAFE_className?: {
    menu?: string;
    header?: string;
    action?: string;
  };
  readonly UNSAFE_style?: {
    menu?: React.CSSProperties;
    header?: React.CSSProperties;
    action?: React.CSSProperties;
  };
}

export interface MenuComposableProps extends ActionListRootProps {
  readonly children: React.ReactNode;
  readonly ariaLabel?: string;
  readonly trigger?: React.ReactNode;
}

export interface MenuResponsiveProps extends ActionListRootProps {
  readonly ariaLabel?: string;
  readonly trigger: React.ReactNode;
}

export type MenuProps = MenuLegacyProps;

export interface SectionProps {
  header?: string;
  actions: ActionProps[];
}

export interface SectionHeaderProps {
  readonly text: string;
  readonly style?: React.CSSProperties;
  readonly className?: string;
}

export interface ActionProps {
  readonly label: string;
  readonly sectionLabel?: string;
  readonly icon?: IconNames;
  readonly iconColor?: IconColorNames;
  readonly destructive?: boolean;
  readonly style?: React.CSSProperties;
  readonly className?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export interface MenuSectionComposableProps extends ActionListSectionProps {}

export interface MenuHeaderComposableProps extends ActionListHeaderProps {}

export interface MenuItemComposableProps extends ActionListItemProps {}

export interface MenuItemIconComposableProps extends ActionListItemIconProps {}

interface SurfaceStyleProps {
  readonly style?: React.CSSProperties;
  readonly className?: string;
}

export interface MenuContentComposableProps extends SurfaceStyleProps {
  readonly children: React.ReactNode;
}

export interface MenuTriggerComposableProps extends SurfaceStyleProps {
  readonly ariaLabel?: string;
  readonly children: React.ReactNode;
}

export interface MenuSeparatorComposableProps
  extends ActionListSeparatorProps {}

export interface MenuItemLabelComposableProps
  extends ActionListItemLabelProps {}
