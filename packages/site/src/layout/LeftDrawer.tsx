import { Box, Button } from "@jobber/components";
import { PropsWithChildren } from "react";
import styles from "./LeftDrawer.module.css";

interface LeftDrawerProps extends PropsWithChildren {
  readonly onClose: () => void;
  readonly header?: React.ReactNode;
}

export function LeftDrawer({ children, onClose, header }: LeftDrawerProps) {
  return (
    <div className={styles.drawer}>
      <Box padding="base" direction="row" alignItems="center" gap="small">
        <Button
          icon="cross"
          ariaLabel="Close"
          type="tertiary"
          variation="subtle"
          onClick={onClose}
        />
        {header}
      </Box>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
