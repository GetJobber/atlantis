import React from "react";
import { ModalProvider, useModalContext } from "./ModalContext";
import { ModalProps } from "./Modal.types";
import {
  ModalActions,
  ModalActivator,
  ModalHeader,
  ModalWrapper,
} from "./ModalInternals";

const Modal = ({
  open = false,
  title,
  size,
  dismissible = true,
  children,
  primaryAction,
  secondaryAction,
  tertiaryAction,
  onRequestClose,
  activatorRef,
  UNSAFE_className,
  UNSAFE_style,
}: ModalProps) => {
  return (
    <ModalProvider
      open={open}
      size={size}
      dismissible={dismissible}
      onRequestClose={onRequestClose}
      activatorRef={activatorRef}
    >
      <Modal.Wrapper
        UNSAFE_className={UNSAFE_className}
        UNSAFE_style={UNSAFE_style}
      >
        <ModalContent
          title={title}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          tertiaryAction={tertiaryAction}
          UNSAFE_className={UNSAFE_className}
          UNSAFE_style={UNSAFE_style}
        >
          {children}
        </ModalContent>
      </Modal.Wrapper>
    </ModalProvider>
  );
};

/**
 * Default Modal Content for Modal. Used to maintain backwards compatibility with the legacy modal.
 */
function ModalContent({
  title,
  children,
  primaryAction,
  secondaryAction,
  tertiaryAction,
  UNSAFE_className,
  UNSAFE_style,
}: ModalProps) {
  const { onRequestClose, dismissible } = useModalContext();
  const template = (
    <>
      {title != undefined && (
        <Modal.Header
          title={title}
          dismissible={dismissible}
          onRequestClose={onRequestClose}
          UNSAFE_className={UNSAFE_className}
          UNSAFE_style={UNSAFE_style}
        />
      )}
      {children}
      <Modal.Actions
        primary={primaryAction}
        secondary={secondaryAction}
        tertiary={tertiaryAction}
        UNSAFE_className={UNSAFE_className}
        UNSAFE_style={UNSAFE_style}
      />
    </>
  );

  return template;
}

Modal.Header = ModalHeader;

Modal.Actions = ModalActions;

Modal.Activator = ModalActivator;
Modal.Provider = ModalProvider;

Modal.Wrapper = ModalWrapper;
export { Modal };
