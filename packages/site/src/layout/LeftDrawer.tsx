import { Box, Button } from "@jobber/components";
import { PropsWithChildren } from "react";
import styles from "./LeftDrawer.module.css";

interface LeftDrawerProps extends PropsWithChildren {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly header?: React.ReactNode;
}

export function LeftDrawer({
  children,
  open,
  onClose,
  header,
}: LeftDrawerProps) {
  if (!open) return null;

  return (
    <div className={styles.drawer}>
      <Box padding="small" direction="row" alignItems="center" gap="small">
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
