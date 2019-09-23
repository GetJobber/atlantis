import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Modal.css";
import sizes from "./Sizes.css";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { Button, ButtonProps } from "../Button";

interface ModalProps {
  /**
   * @default false
   */
  readonly title: string;
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

  if (open && onRequestClose) {
    catchKeyboardEvent("Escape", onRequestClose);
  }

  const template = (
    <AnimatePresence>
      {open && (
        <div className={styles.container}>
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
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              duration: 0.2,
              damping: 20,
              stiffness: 300,
            }}
          >
            <Header
              title={title}
              dismissible={dismissible}
              onRequestClose={onRequestClose}
            />

            <div className={styles.content}>{children}</div>

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
}

function catchKeyboardEvent(key: string, callback: { (): void }) {
  useEffect(() => {
    const handler = function(event: { key: string }) {
      if (event.key === key) {
        callback();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);
}

interface HeaderProps {
  title: string;
  dismissible?: boolean;
  onRequestClose?(): void;
}

function Header({ title, dismissible, onRequestClose }: HeaderProps) {
  return (
    <div className={styles.header}>
      <Typography
        element="h3"
        size="large"
        textCase="uppercase"
        fontWeight="extraBold"
      >
        {title}
      </Typography>

      {dismissible && (
        <button
          className={styles.closeButton}
          onClick={onRequestClose}
          aria-label="Close modal"
        >
          <Icon name="cross" />
        </button>
      )}
    </div>
  );
}

interface ActionsProps {
  primary?: ButtonProps;
  secondary?: ButtonProps;
  tertiary?: ButtonProps;
}

function Actions({ primary, secondary, tertiary }: ActionsProps) {
  const shouldShow =
    primary != undefined || secondary != undefined || tertiary != undefined;

  return (
    <>
      {shouldShow && (
        <div className={styles.actionBar}>
          <div className={styles.rightAction}>
            {primary && <Button {...primary} />}
            {secondary && <Button variation="cancel" {...secondary} />}
          </div>
          {tertiary && (
            <div className={styles.leftAction}>
              <Button variation="destructive" type="secondary" {...tertiary} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
