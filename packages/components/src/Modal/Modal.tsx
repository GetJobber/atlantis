import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import styles from "./Modal.css";
import sizes from "./Sizes.css";

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
  readonly primaryAction?: ActionBase;
  readonly secondaryAction?: ActionBase;
  readonly tertiaryAction?: ActionBase;
  onRequestClose?(): void;
}

interface ActionBase {
  label: string;
  onClick?(): void;
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
    <>
      {open && (
        <div className={styles.container}>
          <div className={styles.overlay} onClick={onRequestClose} />
          <div className={modalClassName}>
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
          </div>
        </div>
      )}
    </>
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
        size="larger"
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
  primary?: ActionBase;
  secondary?: ActionBase;
  tertiary?: ActionBase;
}

function Actions({ primary, secondary, tertiary }: ActionsProps) {
  const shouldShow =
    primary != undefined || secondary != undefined || tertiary != undefined;

  return (
    <>
      {shouldShow && (
        <div className={styles.actionBar}>
          {tertiary && (
            <div className={styles.leftAction}>
              <button onClick={tertiary.onClick}>{tertiary.label}</button>
            </div>
          )}
          <div className={styles.rightAction}>
            {secondary && (
              <button onClick={secondary.onClick}>{secondary.label}</button>
            )}
            {primary && (
              <button onClick={primary.onClick}>{primary.label}</button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
