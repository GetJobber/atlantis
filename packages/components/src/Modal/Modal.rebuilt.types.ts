import React, { MutableRefObject, PropsWithChildren, ReactNode } from "react";
import {
  ExtendedRefs,
  FloatingContext,
  ReferenceType,
} from "@floating-ui/react";
import { XOR } from "ts-xor";
import sizes from "./ModalSizes.module.css";
import { ButtonProps } from "../Button";
import { HeadingProps } from "../Heading";

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

export interface ModalWrapperProps extends PropsWithChildren {
  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    modal?: string;
    overlay?: string;
  };
  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
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
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    modal?: string;
    overlay?: string;
    header?: string;
    title?: HeadingProps["UNSAFE_className"];
    actionBar?: string;
    rightAction?: string;
    leftAction?: string;
  };

  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    modal?: React.CSSProperties;
    overlay?: React.CSSProperties;
    header?: React.CSSProperties;
    title?: HeadingProps["UNSAFE_style"];
    actionBar?: React.CSSProperties;
    rightAction?: React.CSSProperties;
    leftAction?: React.CSSProperties;
  };

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

  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    actionBar?: string;
    rightAction?: string;
    leftAction?: string;
  };

  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    actionBar?: React.CSSProperties;
    rightAction?: React.CSSProperties;
    leftAction?: React.CSSProperties;
  };
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
  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    header?: string;
    title?: HeadingProps["UNSAFE_className"];
    dismissButton?: string;
  };
  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    header?: React.CSSProperties;
    title?: HeadingProps["UNSAFE_style"];
    dismissButton?: React.CSSProperties;
  };
}
type HeaderWithChildren = PropsWithChildren;

export type HeaderProps = XOR<HeaderPropsWithoutChildren, HeaderWithChildren>;
