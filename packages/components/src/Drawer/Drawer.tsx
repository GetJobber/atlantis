import React, { ReactElement, ReactNode, useState } from "react";
import classnames from "classnames";
import styles from "./Drawer.css";
import { Typography } from "../Typography";

interface DrawerProps {
  readonly activator: ReactElement;
  readonly children: ReactNode | ReactNode[];
  readonly title: string;

  /**
   * Initial open value of the drawer. Only use this when you need to
   * pre-populate the checked attribute that is not controlled by the component's
   * state. If a state is controlling it, use the `checked` prop instead.
   */
}

export function Drawer({ activator, title, children }: DrawerProps) {
  const [open, setOpen] = useState(true);
  const drawerClassNames = classnames(styles.drawer, open && styles.open);
  return (
    <>
      {React.cloneElement(activator, {
        onClick: handleDrawerOpen,
      })}
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
              <button onClick={handleDrawerClose}>Close</button>
            </div>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
      <div className={styles.overlay}></div>
    </>
  );

  function handleDrawerClose() {
    setOpen(false);
  }

  function handleDrawerOpen() {
    setOpen(true);
  }
}
