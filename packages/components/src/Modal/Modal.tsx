import React, { ReactNode, RefObject, useEffect, useRef } from "react";
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
  const modalContainer: RefObject<HTMLDivElement> = useRef(
    document.createElement("div"),
  );

  useEffect(() => {
    if (open && modalContainer.current) {
      modalContainer.current.focus();
    }
  });

  catchKeyboardEvent("Escape", open, onRequestClose);

  const template = (
    <AnimatePresence>
      {open && (
        <div ref={modalContainer} className={styles.container} tabIndex={0}>
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
}

function catchKeyboardEvent(
  key: string,
  isModalOpen: boolean,
  callback?: { (): void },
) {
  useEffect(() => {
    const handler = (event: { key: string }) => {
      if (isModalOpen && callback && event.key === key) {
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
    <div className={styles.header} data-testid="modal-header">
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

  if (secondary != undefined) {
    secondary = Object.assign(
      { type: "secondary", variation: "cancel" },
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
