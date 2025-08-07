import React, { MutableRefObject, PropsWithChildren, ReactNode } from "react";
import {
  ExtendedRefs,
  ReferenceType,
  UseInteractionsReturn,
} from "@floating-ui/react";
import { XOR } from "ts-xor";
import sizes from "./ModalSizes.module.css";
import { ButtonProps } from "../Button";

export interface ModalProviderProps {
  readonly children: React.ReactNode;
  /**
   * Size of the modal.
   */
  readonly size?: keyof typeof sizes;
  /**
   * Whether the modal is open.
   */
  readonly open?: boolean;
  /**
   * Callback executed when the user wants to close/dismiss the Modal
   */
  readonly onRequestClose?: () => void;
  /**
   * Ref to specify the activator element. Useful if the activator can unmount
   * and focus needs to be returned to the activator element.
   */
  readonly activatorRef?: MutableRefObject<HTMLElement | null> | null;
  readonly dismissible?: boolean;
}

export type ModalContentProps = PropsWithChildren;

export type ModalOverlayProps = PropsWithChildren;

export interface ModalContextType {
  /**
   * Whether the modal is open.
   */
  readonly open?: boolean;
  /**
   * Callback executed when the user wants to close/dismiss the Modal
   */
  onRequestClose?(): void;
  /**
   * Ref to specify the activator element. Useful if the activator can unmount
   * and needs to be re-mounted.
   */
  readonly activatorRef?: MutableRefObject<HTMLElement | null> | null;
  /**
   * Refs used by floating-ui to position the modal.
   */
  readonly floatingRefs: ExtendedRefs<ReferenceType> | null;
  /**
   * Size of the modal.
   */
  readonly size?: keyof typeof sizes;
  /**
   * Whether the modal is dismissible.
   */
  readonly dismissible?: boolean;

  /**
   * Id to provide aria-labelledby to the modal. If you are using Modal.Header with children or another header you will need to provide this as the id of the header.
   * @default "ATL-Modal-Header"
   */
  readonly modalLabelledBy?: string;

  /**
   * Floating-ui props to position the modal.
   */
  readonly getFloatingProps: UseInteractionsReturn["getFloatingProps"];
}

export interface ModalActionsProps {
  /**
   * Primary action of the modal.
   */
  readonly primary?: ButtonProps;
  /**
   * Secondary action of the modal.
   */
  readonly secondary?: ButtonProps;
  /**
   * Tertiary action of the modal. This will be rendered on the left side of the action bar.
   * Useful for actions like "Cancel" that are not destructive.
   */
  readonly tertiary?: ButtonProps;
}

interface HeaderPropsWithoutChildren {
  /**
   * Title of the modal.
   */
  readonly title: string;
  /**
   * Whether the modal is dismissible.
   */
  readonly dismissible?: boolean;
  /**
   * Callback executed when the user wants to close/dismiss the Modal
   */
  onRequestClose?(): void;
}
type HeaderWithChildren = PropsWithChildren;

export type HeaderProps = XOR<HeaderPropsWithoutChildren, HeaderWithChildren>;

export interface ModalLegacyProps {
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
  readonly version?: 1;
}
