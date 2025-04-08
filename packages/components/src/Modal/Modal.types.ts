import React, { MutableRefObject, PropsWithChildren, ReactNode } from "react";
import {
  ExtendedRefs,
  FloatingContext,
  ReferenceType,
} from "@floating-ui/react";
import { XOR } from "ts-xor";
import sizes from "./ModalSizes.module.css";
import { ButtonProps } from "../Button";

export interface ModalProviderProps {
  readonly children: React.ReactNode;
  readonly size?: keyof typeof sizes;
  readonly open?: boolean;
  readonly onRequestClose?: () => void;
  readonly activatorRef?: MutableRefObject<HTMLElement | null> | null;
  readonly dismissible?: boolean;
}

export interface ModalWrapperProps extends PropsWithChildren {
  readonly UNSAFE_className?: {
    modal?: string;
    overlay?: string;
  };
  readonly UNSAFE_style?: {
    modal?: React.CSSProperties;
    overlay?: React.CSSProperties;
  };
}

export interface ModalOverlayProps extends PropsWithChildren {
  readonly UNSAFE_className?: {
    overlay?: string;
  };
  readonly UNSAFE_style?: {
    overlay?: React.CSSProperties;
  };
}

export interface ModalProps {
  /**
   * @default false
   */
  readonly title?: string;
  readonly open?: boolean;
  readonly size?: keyof typeof sizes;
  /**
   * @default true
   */
  readonly dismissible?: boolean;
  readonly children: ReactNode;
  readonly primaryAction?: ButtonProps;
  readonly secondaryAction?: ButtonProps;
  readonly tertiaryAction?: ButtonProps;
  onRequestClose?(): void;
  /**
   * Ref to specify the activator element. Useful if the activator can unmount
   * and needs to be re-mounted.
   */
  activatorRef?: MutableRefObject<HTMLElement | null> | null;

  UNSAFE_className?: {
    modal?: string;
    overlay?: string;
    container?: string;
    header?: string;
    actionBar?: string;
    rightAction?: string;
    leftAction?: string;
  };
  UNSAFE_style?: {
    modal?: React.CSSProperties;
    overlay?: React.CSSProperties;
    container?: React.CSSProperties;
    header?: React.CSSProperties;
    actionBar?: React.CSSProperties;
    rightAction?: React.CSSProperties;
    leftAction?: React.CSSProperties;
  };
}

export interface ModalContextType {
  open?: boolean;
  onRequestClose: () => void;
  activatorRef: MutableRefObject<HTMLElement | null>;
  floatingRefs: ExtendedRefs<ReferenceType> | null;
  floatingContext: FloatingContext;
  size?: keyof typeof sizes;
  floatingNodeId?: string;
  dismissible?: boolean;
}

export interface ModalActionsProps {
  readonly primary?: ButtonProps;
  readonly secondary?: ButtonProps;
  readonly tertiary?: ButtonProps;
  readonly UNSAFE_className?: {
    actionBar?: string;
    rightAction?: string;
    leftAction?: string;
  };
  readonly UNSAFE_style?: {
    actionBar?: React.CSSProperties;
    rightAction?: React.CSSProperties;
    leftAction?: React.CSSProperties;
  };
}

interface HeaderPropsWithoutChildren {
  readonly title: string;
  readonly dismissible?: boolean;
  onRequestClose?(): void;
  readonly UNSAFE_className?: {
    header?: string;
    dismissButton?: string;
  };
  readonly UNSAFE_style?: {
    header?: React.CSSProperties;
    dismissButton?: React.CSSProperties;
  };
}
type HeaderWithChildren = PropsWithChildren;

export type HeaderProps = XOR<HeaderPropsWithoutChildren, HeaderWithChildren>;
