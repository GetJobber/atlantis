import React from "react";
import classnames from "classnames";
import styles from "./FormField.module.css";
import { Icon } from "../Icon";
import { Spinner } from "../Spinner";

interface FormFieldPostFixProps {
  readonly variation: "select" | "spinner";
  readonly visible?: boolean;
  readonly className?: string;
}

export function FormFieldPostFix({
  variation,
  visible = true,
  className,
}: FormFieldPostFixProps) {
  if (!visible) return null;

  return (
    <span className={classnames(styles.postfix, className)}>
      {variation === "select" ? (
        <Icon name="arrowDown" />
      ) : (
        <Spinner size="small" />
      )}
    </span>
  );
}
