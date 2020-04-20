import React from "react";
import classnames from "classnames";
import styles from "./FormatEmail.css";

interface FormatEmailProps {
  /**
   * Email address to format
   */
  readonly email?: string;
}

export function FormatEmail({ email }: FormatEmailProps) {
  const className = classnames(styles.email);
  return <address className={className}>{email}</address>;
}
