import React, { ReactElement } from "react";
import styles from "./Table.module.css";
import { Row } from "./Row";

interface HeaderProps {
  readonly children: ReactElement | ReactElement[];
}

export function Header({ children }: HeaderProps) {
  return (
    <thead className={styles.header}>
      <Row>{children}</Row>
    </thead>
  );
}
