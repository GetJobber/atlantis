import type { ReactElement } from "react";
import React from "react";
import styles from "./Table.module.css";
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
