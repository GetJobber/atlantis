import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import styles from "./Modal.css";

interface ModalProps {
  /**
   * @default true
   */
  readonly open: boolean;
  readonly title: string;
  readonly size?: "small" | "large";
  /**
   * @default true
   */
  readonly dismissible?: boolean;
  readonly children: ReactNode;
  onRequestClose?(): void;
}

const appRoot = document.body;

export function Modal({
  open = true,
  title,
  size,
  dismissible = true,
  children,
  onRequestClose,
}: ModalProps) {
  const template = (
    <>
      {open && (
        <div className={styles.modal}>
          <div className={styles.overlay} />
          <div className={styles.box}>
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

  return ReactDOM.createPortal(template, appRoot);
}
