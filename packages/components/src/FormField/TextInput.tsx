import React, { useState } from "react";
import classnames from "classnames";
import styles from "./FormField.css";

export const RawTextInput = ({
  className,
  ...rest
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return <input {...rest} className={`${styles.input} ${className}`} />;
};

export const TextInput = ({ className = "", label = "", ...rest }) => {
  const [miniMode, setMiniMode] = useState(false);
  const wrapperClasses = classnames(styles.wrapper, {
    [styles.miniLabel]: miniMode,
  });

  return (
    <div className={wrapperClasses}>
      <div className={styles.childrenWrapper}>
        <label className={styles.label}>{label}</label>
        <RawTextInput
          className={className}
          {...rest}
          onChange={e => {
            setMiniMode(!!e.target.value);
          }}
        />
      </div>
    </div>
  );
};
