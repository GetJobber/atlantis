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
  UNSAFE_className,
  UNSAFE_style,
}: ModalRewriteProps) {
  return (
    <ModalProvider
      open={open}
      size={size}
      dismissible={dismissible}
      onRequestClose={onRequestClose}
      activatorRef={activatorRef}
    >
      <ModalWrapper
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
  UNSAFE_className,
  UNSAFE_style,
}: Omit<ModalRewriteProps, "version">) {
  const { onRequestClose, dismissible } = useModalContext();
  const template = (
    <>
      {title != undefined && (
        <ModalHeader
          title={title}
          dismissible={dismissible}
          onRequestClose={onRequestClose}
          UNSAFE_className={UNSAFE_className}
          UNSAFE_style={UNSAFE_style}
        />
      )}
      {children}
      <ModalActions
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
