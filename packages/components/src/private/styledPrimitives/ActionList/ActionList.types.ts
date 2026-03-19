import type React from "react";
import type { IconProps } from "../../../Icon";

interface StyleProps {
  readonly style?: React.CSSProperties;
  readonly className?: string;
}

export interface ActionListRootProps {
  readonly children: React.ReactNode;
  readonly open?: boolean;
  readonly defaultOpen?: boolean;
  readonly onOpenChange?: (isOpen: boolean) => void;
}

export interface ActionListSectionProps extends StyleProps {
  readonly children: React.ReactNode;
  readonly ariaLabel?: string;
}

export interface ActionListHeaderProps extends StyleProps {
  readonly children: React.ReactNode;
}

export type ActionListItemVariant = "destructive";

export interface ActionListItemProps extends StyleProps {
  readonly variation?: ActionListItemVariant;
  readonly children: React.ReactNode;
  readonly onClick?: (event?: React.MouseEvent) => void;
  readonly textValue: string;
  readonly href?: string;
  readonly target?: string;
  readonly rel?: string;
}

export interface ActionListItemContentProps {
  readonly children: React.ReactNode;
  readonly variation?: ActionListItemProps["variation"];
}

export interface ActionListItemIconProps extends IconProps {}

export interface ActionListSeparatorProps extends StyleProps {}

export interface ActionListItemLabelProps {
  readonly children: React.ReactNode;
}

export interface ActionListHeaderLabelProps {
  readonly children: React.ReactNode;
}
