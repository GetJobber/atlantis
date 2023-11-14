import React from "react";
import classnames from "classnames";
import styles from "./FormField.css";

export const RawDateInput = ({
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <input type="date" {...rest} className={`${styles.input} ${className}`} />
  );
};

export const DateInput = ({ className = "", label = "", ...rest }) => {
  const wrapperClasses = classnames(styles.wrapper, styles.miniLabel);

  return (
    <div className={wrapperClasses}>
      <div className={styles.childrenWrapper}>
        <label className={styles.label}>{label}</label>
        <RawDateInput className={className} {...rest} />
      </div>
    </div>
  );
};
