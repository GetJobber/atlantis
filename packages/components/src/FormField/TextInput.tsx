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
  const [miniMode, setMiniMode] = useState(rest.type === "time");
  const input = useRef<HTMLInputElement>(null);
  const [uselessState, setUselessState] = useState(false);

  useEffect(() => {
    const setRef =
      (ref as React.RefObject<HTMLInputElement>)?.current ??
      (input as React.RefObject<HTMLInputElement>)?.current;
    setMiniMode(rest.type === "time" || !!setRef?.value);
  }, [input.current?.value]);

  useEffect(() => {
    setUselessState(!uselessState);
  }, [className]);

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
            ref={ref || input}
          />
        </div>
      </div>
    </div>
  );
};

export const TextInput = forwardRef(TextInputInternal);
