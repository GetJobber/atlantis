import type { MutableRefObject, PropsWithChildren, ReactNode } from "react";
import type {
  ExtendedRefs,
  FloatingContext,
  ReferenceType,
  UseInteractionsReturn,
} from "@floating-ui/react";
import type sizes from "./ModalSizes.module.css";
import type { ButtonProps } from "../Button";

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
   * Context used by floating-ui to position the modal.
   */
  readonly floatingContext: FloatingContext;
  /**
   * Size of the modal.
   */
  readonly size?: keyof typeof sizes;
  /**
   * Floating-ui node id for the modal. Used to ensure the modal is aware of other floating-ui elements.
   */
  readonly floatingNodeId?: string;
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
   * Accessible name for the Modal.
   * Intended for use when no Header/Title content is provided, as the Heading/title takes precedence over ariaLabel.
   */
  readonly ariaLabel?: string;

  /**
   * Floating-ui props to position the modal.
   */
  readonly getFloatingProps: UseInteractionsReturn["getFloatingProps"];

  /**
   * Tracks whether the current pointer interaction began inside the dialog.
   * Used to disambiguate outsidePress after nested overlay closes.
   */
  readonly startedInsideRef?: MutableRefObject<boolean>;
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

export interface HeaderProps extends PropsWithChildren {}

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
  /**
   * Accessible name for the Modal.
   * Only required if no title is provided. Title takes precedence over ariaLabel.
   */
  readonly ariaLabel?: string;
}
