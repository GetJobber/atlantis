import React, { forwardRef, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./FormField.css";
import { RawTextInputProps } from "./Types";

export const RawTextInput = (
  { className, ...rest }: RawTextInputProps,

  ref: React.Ref<HTMLInputElement>,
) => {
  return (
    <input {...rest} ref={ref} className={`${styles.input} ${className}`} />
  );
};

const RawTextWithRef = forwardRef(RawTextInput);

const TextInputInternal = (
  { className = "", prefix = "", placeholder = "", ...rest }: RawTextInputProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  const [miniMode, setMiniMode] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const setRef =
      (ref as React.RefObject<HTMLInputElement>) ??
      (input as React.RefObject<HTMLInputElement>);
    setMiniMode(!!setRef?.current?.value);
  }, [input.current?.value]);

  const wrapperClasses = classnames(styles.wrapper, {
    [styles.miniLabel]: miniMode,
  });

  return (
    <div className={wrapperClasses}>
      <div className={styles.childrenWrapper}>
        <label className={styles.label}>{placeholder}</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <RawTextWithRef
            className={className}
            {...rest}
            onChange={e => {
              setMiniMode(!!e.target.value);

              if (rest.onChange) {
                rest.onChange(e);
              }
            }}
            ref={input || ref}
          />
        </div>
      </div>
    </div>
  );
};

export const TextInput = forwardRef(TextInputInternal);
