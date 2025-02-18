import { Button } from "@jobber/components";
import { PropsWithChildren } from "react";
import styles from "./LeftDrawer.module.css";

interface LeftDrawerProps extends PropsWithChildren {
  readonly open: boolean;
  readonly onClose: () => void;
}

export function LeftDrawer({ children, open, onClose }: LeftDrawerProps) {
  if (!open) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.drawer}>
        <div className={styles.header}>
          <Button
            icon="cross"
            ariaLabel="Close"
            type="tertiary"
            variation="subtle"
            onClick={onClose}
          />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
}
