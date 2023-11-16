import React, { forwardRef, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./FormField.css";
import { RawTextInputProps, TextInputProps } from "./Types";

export const RawTextInput = (
  { className, ...rest }: RawTextInputProps,

  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <input {...rest} ref={ref} className={`${styles.input} ${className}`} />
  );
};

const RawTextInputWithRef = forwardRef(RawTextInput);

export const TextInput = ({
  className = "",
  label = "",
  prefix = "",
  ...rest
}: TextInputProps) => {
  const [miniMode, setMiniMode] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMiniMode(!!input.current?.value);
  }, [input.current?.value]);

  const wrapperClasses = classnames(styles.wrapper, {
    [styles.miniLabel]: miniMode,
  });

  return (
    <div className={wrapperClasses}>
      <div className={styles.childrenWrapper}>
        <label className={styles.label}>{label}</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <RawTextInputWithRef
            className={className}
            {...rest}
            onChange={e => {
              setMiniMode(!!e.target.value);

              if (rest.onChange) {
                rest.onChange(e);
              }
            }}
            ref={input}
          />
        </div>
      </div>
    </div>
  );
};
