import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import styles from "./Modal.css";
import sizes from "./Sizes.css";

interface ModalProps {
  /**
   * @default true
   */
  readonly open: boolean;
  readonly title: string;
  readonly size?: keyof typeof sizes;
  /**
   * @default true
   */
  readonly dismissible?: boolean;
  readonly children: ReactNode;
  onRequestClose?(): void;
}

export function Modal({
  open = true,
  title,
  size,
  dismissible = true,
  children,
  onRequestClose,
}: ModalProps) {
  const modalClassName = classnames(styles.modal, size && sizes[size]);
  const template = (
    <>
      {open && (
        <div className={styles.container}>
          <div className={styles.overlay} onClick={onRequestClose} />
          <div className={modalClassName}>
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
                <button className={styles.closeButton} onClick={onRequestClose}>
                  <Icon name="cross" />
                </button>
              )}
            </div>

            <div className={styles.content}>{children}</div>
          </div>
        </div>
      )}
    </>
  );

  return ReactDOM.createPortal(template, document.body);
}
