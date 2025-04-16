import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { ModalV2Props } from "./types";
import styles from "./ModalV2.module.css";
import { Button } from "../Button";
import { Heading } from "../Heading";
import { Cluster } from "../Cluster";

export function Modal({
  open = false,
  title,
  children,
  dismissible = true,
  onRequestClose,
  primaryAction,
  secondaryAction,
  tertiaryAction,
  size,
}: ModalV2Props) {
  const { dialogRef, handleBackdropClick } = useModal({
    open,
    onRequestClose,
    dismissible,
  });

  return (
    <dialog
      style={
        {
          "--modal-animation-direction": open ? "normal" : "reverse",
        } as React.CSSProperties
      }
      ref={dialogRef}
      onClick={handleBackdropClick}
      className={classNames(
        styles.container,
        size && styles[size],
        open ? styles.visible : styles.hidden,
      )}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <Modal.Title>{title}</Modal.Title>
          <Modal.DismissButton
            visible={dismissible}
            onRequestClose={onRequestClose}
          />
        </div>
        {children}
        <Modal.Actions
          visible={!!primaryAction || !!secondaryAction || !!tertiaryAction}
        >
          <Cluster justify="space-between">
            <Cluster>
              {tertiaryAction && (
                <Button
                  {...tertiaryAction}
                  type="secondary"
                  variation="destructive"
                />
              )}
            </Cluster>
            <Cluster gap="small">
              {secondaryAction && (
                <Button {...secondaryAction} variation="subtle" />
              )}
              {primaryAction && <Button {...primaryAction} />}
            </Cluster>
          </Cluster>
        </Modal.Actions>
      </div>
    </dialog>
  );
}

function useModal({
  open,
  onRequestClose,
  dismissible,
}: Pick<ModalV2Props, "open" | "onRequestClose" | "dismissible">) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (open && dialog && dialog.showModal) {
      dialog?.showModal();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;

    const handleClose = () => {
      if (onRequestClose) {
        onRequestClose();
      }
    };

    if (dialog) {
      dialog.addEventListener("close", handleClose);

      return () => {
        dialog.removeEventListener("close", handleClose);
      };
    }
  }, [onRequestClose]);

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDialogElement, MouseEvent>,
  ) => {
    if (dismissible && event.target === dialogRef.current) {
      if (onRequestClose) {
        onRequestClose();
      }
    }
  };

  return { dialogRef, handleBackdropClick };
}

function ModalDismiss({
  onRequestClose,
  visible,
}: {
  readonly onRequestClose?: () => void;
  readonly visible: boolean;
}) {
  if (!visible) {
    return null;
  }

  return (
    <div className={styles.closeButton}>
      <Button
        onClick={onRequestClose}
        ariaLabel="Close modal"
        icon="remove"
        type="tertiary"
        variation="subtle"
      />
    </div>
  );
}

function ModalTitle({ children }: { readonly children: React.ReactNode }) {
  if (!children) {
    return null;
  }

  return (
    <div data-testid="modal-header">
      <Heading level={2}>{children}</Heading>
    </div>
  );
}

function ModalActions({
  children,
  visible,
}: {
  readonly children: React.ReactNode;
  readonly visible: boolean;
}) {
  if (!visible) {
    return null;
  }

  return <div className={styles.actionBar}>{children}</div>;
}

Modal.DismissButton = ModalDismiss;
Modal.Title = ModalTitle;
Modal.Actions = ModalActions;
