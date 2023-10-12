import React, { ReactElement } from "react";
import styles from "./Table.css";
import { Row } from "./Row";

interface FooterProps {
  readonly children: ReactElement | ReactElement[];
}

export function Footer({ children }: FooterProps) {
  return (
    <tfoot className={styles.footer}>
      <Row>{children}</Row>
    </tfoot>
  );
}
