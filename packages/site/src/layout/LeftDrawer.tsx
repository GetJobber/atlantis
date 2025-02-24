import { Box, Button } from "@jobber/components";
import { PropsWithChildren, useState } from "react";
import styles from "./LeftDrawer.module.css";

interface LeftDrawerProps extends PropsWithChildren {
  readonly onClose: () => void;
  readonly header?: React.ReactNode;
}

export function LeftDrawer({ children, onClose, header }: LeftDrawerProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <div
      className={`${styles.drawer} ${isClosing ? styles.drawerClosing : ""}`}
    >
      <Box padding="base" direction="row" alignItems="center" gap="small">
        <Button
          icon="cross"
          ariaLabel="Close"
          type="tertiary"
          variation="subtle"
          onClick={handleClose}
        />
        {header}
      </Box>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
