import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./Drawer.css";
import { Typography } from "../Typography";
import { Icon } from "../Icon";

interface DrawerProps {
  readonly children: ReactNode | ReactNode[];
  readonly title: string;
  readonly open?: boolean;
  onRequestClose?(): void;

  /**
   * Initial open value of the drawer. Only use this when you need to
   * pre-populate the checked attribute that is not controlled by the component's
   * state. If a state is controlling it, use the `checked` prop instead.
   */
}

export function Drawer({
  title,
  children,
  open = true,
  onRequestClose,
}: DrawerProps) {
  const drawerClassNames = classnames(styles.drawer, open && styles.open);
  return (
    <>
      <div className={drawerClassNames}>
        <div className={styles.frame}>
          <div className={styles.header}>
            <Typography
              element="h3"
              size="large"
              textCase="uppercase"
              fontWeight="extraBold"
            >
              {title}
            </Typography>
            <div>
              <button
                className={styles.closeButton}
                onClick={onRequestClose}
                aria-label="Close modal"
              >
                <Icon name="cross" />
              </button>
            </div>
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
