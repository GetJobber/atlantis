import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import styles from "./Modal.css";
import sizes from "./Sizes.css";
import { Heading } from "../Heading";
import { Button, ButtonProps } from "../Button";
import { ButtonDismiss } from "../ButtonDismiss";

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
}

export function Modal({
  open = false,
  title,
  size,
  dismissible = true,
  children,
  primaryAction,
  secondaryAction,
  tertiaryAction,
  onRequestClose,
}: ModalProps) {
  const modalClassName = classnames(styles.modal, size && sizes[size]);
  useRefocusOnActivator(open);
  const modalRef = useFocusTrap<HTMLDivElement>(open);
  useOnKeyDown(handleRequestClose, "Escape");

  const template = (
    <AnimatePresence>
      {open && (
        <div
          ref={modalRef}
          role="dialog"
          className={styles.container}
          tabIndex={0}
        >
          <motion.div
            key={styles.overlay}
            className={styles.overlay}
            onClick={onRequestClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            key={styles.modal}
            className={modalClassName}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            {title != undefined && (
              <Header
                title={title}
                dismissible={dismissible}
                onRequestClose={onRequestClose}
              />
            )}
            {children}

            <Actions
              primary={primaryAction}
              secondary={secondaryAction}
              tertiary={tertiaryAction}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(template, document.body);

  function handleRequestClose() {
    if (open && onRequestClose) {
      onRequestClose();
    }
  }
}

interface HeaderProps {
  readonly title: string;
  readonly dismissible?: boolean;
  onRequestClose?(): void;
}

function Header({ title, dismissible, onRequestClose }: HeaderProps) {
  return (
    <div className={styles.header} data-testid="modal-header">
      <Heading level={3}>{title}</Heading>

      {dismissible && (
        <ButtonDismiss onClick={onRequestClose} ariaLabel="Close modal" />
      )}
    </div>
  );
}

interface ActionsProps {
  readonly primary?: ButtonProps;
  readonly secondary?: ButtonProps;
  readonly tertiary?: ButtonProps;
}

function Actions({ primary, secondary, tertiary }: ActionsProps) {
  const shouldShow =
    primary != undefined || secondary != undefined || tertiary != undefined;

  if (secondary != undefined) {
    secondary = Object.assign(
      { type: "primary", variation: "subtle" },
      secondary,
    );
  }

  if (tertiary != undefined) {
    tertiary = Object.assign(
      { type: "secondary", variation: "destructive" },
      tertiary,
    );
  }

  return (
    <>
      {shouldShow && (
        <div className={styles.actionBar}>
          <div className={styles.rightAction}>
            {primary && <Button {...primary} />}
            {secondary && <Button {...secondary} />}
          </div>
          {tertiary && (
            <div className={styles.leftAction}>
              <Button {...tertiary} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
