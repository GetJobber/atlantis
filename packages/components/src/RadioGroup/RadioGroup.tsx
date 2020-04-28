import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./RadioGroup.css";

interface RadioGroupProps {
  readonly children: ReactNode;
  value(): void;
  onChange(): void;
  name: string;
  header: string;
}

export function RadioGroup({
  children,
  value,
  onChange,
  name,
  header,
}: RadioGroupProps) {
  const className = classnames(styles.radioGroup);

  return <div className={className}>{children}</div>;
}
