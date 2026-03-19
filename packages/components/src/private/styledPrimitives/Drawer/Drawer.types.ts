import type React from "react";

interface StyleProps {
  readonly style?: React.CSSProperties;
  readonly className?: string;
}

export interface DrawerRootProps {
  readonly children: React.ReactNode;
  readonly open?: boolean;
  readonly defaultOpen?: boolean;
  readonly onOpenChange?: (isOpen: boolean) => void;
}

export interface DrawerTriggerProps extends StyleProps {
  readonly ariaLabel?: string;
  readonly children: React.ReactNode;
}

export interface DrawerPortalProps {
  readonly children: React.ReactNode;
}

export interface DrawerBackdropProps {
  readonly className?: string;
}

export interface DrawerPopupProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export interface DrawerContentProps extends StyleProps {
  readonly children: React.ReactNode;
}
