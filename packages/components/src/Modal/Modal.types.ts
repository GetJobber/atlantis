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
   * and focused needs to be returned to the activator element.
   */
  readonly activatorRef?: MutableRefObject<HTMLElement | null> | null;
  readonly dismissible?: boolean;
}

export type ModalWrapperProps = PropsWithChildren;

export type ModalOverlayProps = PropsWithChildren;

export interface ModalRewriteProps {
  /**
   * Title of the modal.
   */
  readonly title?: string;
  /**
   * Whether the modal is open.
   */
  readonly open?: boolean;
  /**
   * Size of the modal.
   */
  readonly size?: keyof typeof sizes;
  /**
   * Whether the modal will render a dismiss button.
   * @default true
   */
  readonly dismissible?: boolean;
  readonly children: ReactNode;
  /**
   * Primary action of the modal.
   */
  readonly primaryAction?: ButtonProps;
  /**
   * Secondary action of the modal.
   */
  readonly secondaryAction?: ButtonProps;
  /**
   * Tertiary action of the modal. This will be rendered on the left side of the action bar.
   * Useful for actions like "Cancel" that are not destructive.
   */
  readonly tertiaryAction?: ButtonProps;
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
   * Use the new implementation of Modal only supported in
   */
  readonly version: 2;
}

export interface ModalContextType {
  readonly open?: ModalRewriteProps["open"];
  readonly onRequestClose: ModalRewriteProps["onRequestClose"];
  readonly activatorRef: ModalRewriteProps["activatorRef"];
  /**
   * Refs used by floating-ui to position the modal.
   */
  readonly floatingRefs: ExtendedRefs<ReferenceType> | null;
  /**
   * Context used by floating-ui to position the modal.
   */
  readonly floatingContext: FloatingContext;
  /**
   * Size of the modal.
   */
  readonly size?: ModalRewriteProps["size"];
  /**
   * Floating-ui node id for the modal. Used to ensure the modal is aware of other floating-ui elements.
   */
  readonly floatingNodeId?: string;
  /**
   * Whether the modal is dismissible.
   */
  readonly dismissible?: ModalRewriteProps["dismissible"];
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
  readonly title: NonNullable<ModalRewriteProps["title"]>;
  /**
   * Whether the modal is dismissible.
   */
  readonly dismissible?: ModalRewriteProps["dismissible"];
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
