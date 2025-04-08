import React from "react";
import classnames from "classnames";
import { ModalProvider, ModalWrapper, useModalContext } from "./ModalContext";
import { HeaderProps, ModalActionsProps, ModalProps } from "./Modal.types";
import { useModalStyles } from "./useModalStyles";
import { Heading } from "../Heading";
import { Button } from "../Button";
import { ButtonDismiss } from "../ButtonDismiss";

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

Modal.Header = function Header({
  title,
  children,
  UNSAFE_className,
  UNSAFE_style,
}: HeaderProps) {
  const { header, dismissButton } = useModalStyles();
  const { dismissible, onRequestClose } = useModalContext();
  const headerClassName = classnames(header, UNSAFE_className?.header);
  const dismissButtonClassName = classnames(
    dismissButton,
    UNSAFE_className?.dismissButton,
  );
  const content = children ?? (
    <div
      className={headerClassName}
      data-testid="ATL-Modal-Header"
      style={UNSAFE_style?.header}
    >
      <Heading level={2}>{title}</Heading>

      {dismissible && (
        <div
          className={dismissButtonClassName}
          style={UNSAFE_style?.dismissButton}
        >
          <ButtonDismiss onClick={onRequestClose} ariaLabel="Close modal" />
        </div>
      )}
    </div>
  );

  return <>{content}</>;
};

Modal.Actions = function Actions({
  primary,
  secondary,
  tertiary,
  UNSAFE_className,
  UNSAFE_style,
}: ModalActionsProps) {
  const { actionBar, rightAction, leftAction } = useModalStyles();
  const shouldShow =
    primary != undefined || secondary != undefined || tertiary != undefined;
  const actionBarClassName = classnames(actionBar, UNSAFE_className?.actionBar);
  const rightActionClassName = classnames(
    rightAction,
    UNSAFE_className?.rightAction,
  );
  const leftActionClassName = classnames(
    leftAction,
    UNSAFE_className?.leftAction,
  );

  return (
    <>
      {shouldShow && (
        <div
          className={actionBarClassName}
          style={UNSAFE_style?.actionBar}
          data-testid="ATL-Modal-Actions"
        >
          <div
            className={rightActionClassName}
            style={UNSAFE_style?.rightAction}
          >
            {primary && <Button {...primary} />}
            {secondary && (
              <Button {...secondary} type="primary" variation="subtle" />
            )}
          </div>
          {tertiary && (
            <div
              className={leftActionClassName}
              style={UNSAFE_style?.leftAction}
            >
              <Button {...tertiary} type="secondary" variation="destructive" />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export { Modal };
