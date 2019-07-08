import React, { ReactNode } from "react";
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
  readonly open: boolean;
  readonly title: string;
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
  const template = (
    <>
      {open && (
        <div className={styles.container}>
          <div className={modalClassName}>
            <Header dismissible={dismissible} onRequestClose={onRequestClose}>
              {title}
            </Header>

            <div className={styles.content}>{children}</div>

            <Actions
              primary={primaryAction}
              secondary={secondaryAction}
              tertiary={tertiaryAction}
            />
          </div>
          <div className={styles.overlay} onClick={onRequestClose} />
        </div>
      )}
    </>
  );

  return ReactDOM.createPortal(template, document.body);
}

interface HeaderProps {
  dismissible?: boolean;
  children: ReactNode;
  onRequestClose?(): void;
}

export function Header({ children, dismissible, onRequestClose }: HeaderProps) {
  return (
    <div className={styles.header}>
      <Typography
        element="h3"
        size="larger"
        textCase="uppercase"
        fontWeight="extraBold"
      >
        {children}
      </Typography>

      {dismissible && (
        <button className={styles.closeButton} onClick={onRequestClose}>
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

export function Actions({ primary, secondary, tertiary }: ActionsProps) {
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
