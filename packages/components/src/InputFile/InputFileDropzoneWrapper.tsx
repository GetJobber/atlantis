import React from "react";
import styles from "./InputFile.module.css";

export function InputFileDropzoneWrapper({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div className={styles.dropzoneContent}>{children}</div>;
}
