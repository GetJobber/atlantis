import React, { PropsWithChildren, useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./FormField.css";

export const RawSelectInput = ({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>) => {
  return (
    <select {...rest} className={`${styles.input} ${className}`}>
      {children}
    </select>
  );
};
export interface SelectInputProps extends PropsWithChildren {
  readonly className?: string;
  readonly label?: string;
}

export const SelectInput = ({
  children,
  className = "",
  label = "",
  ...rest
}: SelectInputProps) => {
  const [miniMode, setMiniMode] = useState(false);

  const wrapperClasses = classnames(styles.wrapper, {
    [styles.miniLabel]: miniMode,
  });

  useEffect(() => {
    if (React.Children.count(children) > 0) {
      setMiniMode(true);
    }
  }, [children]);

  return (
    <div className={wrapperClasses}>
      <div className={styles.childrenWrapper}>
        <label className={styles.label}>{label}</label>
        <RawSelectInput
          className={className}
          {...rest}
          onChange={e => {
            setMiniMode(!!e.target.value);
          }}
        >
          {children}
        </RawSelectInput>
      </div>
    </div>
  );
};

export const SelectOption = ({
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>) => {
  return <option {...rest}>{children}</option>;
};
