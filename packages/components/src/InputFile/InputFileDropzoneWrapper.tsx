import React from "react";
import styles from "./InputFile.module.css";
import { Content } from "../Content";

export function InputFileDropzoneWrapper({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className={styles.dropzoneContent}>
      <Content spacing="small">{children}</Content>
    </div>
  );
}
