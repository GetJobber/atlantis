import React from "react";
import { ModalProvider, useModalContext } from "./ModalContext.rebuilt";
import { ModalRewriteProps } from "./Modal.types";
import {
  ModalActions,
  ModalHeader,
  ModalWrapper,
} from "./ModalInternals.rebuilt";

export function ModalRebuilt({
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
}: ModalRewriteProps) {
  return (
    <ModalProvider
      open={open}
      size={size}
      dismissible={dismissible}
      onRequestClose={onRequestClose}
      activatorRef={activatorRef}
    >
      <ModalWrapper>
        <ModalContent
          title={title}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          tertiaryAction={tertiaryAction}
        >
          {children}
        </ModalContent>
      </ModalWrapper>
    </ModalProvider>
  );
}

/**
 * Default Modal Content for Modal. Used to maintain backwards compatibility with the legacy modal.
 */
function ModalContent({
  title,
  children,
  primaryAction,
  secondaryAction,
  tertiaryAction,
}: Omit<ModalRewriteProps, "version">) {
  const { onRequestClose, dismissible } = useModalContext();
  const template = (
    <>
      {title != undefined && (
        <ModalHeader
          title={title}
          dismissible={dismissible}
          onRequestClose={onRequestClose}
        />
      )}
      {children}
      <ModalActions
        primary={primaryAction}
        secondary={secondaryAction}
        tertiary={tertiaryAction}
      />
    </>
  );

  return template;
}
