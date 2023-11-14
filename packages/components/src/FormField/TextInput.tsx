import React, { forwardRef, useEffect, useRef, useState } from "react";
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

const RawTextInputWithRef = forwardRef(RawTextInput);

export const TextInput = ({ className = "", label = "", ...rest }) => {
  const [miniMode, setMiniMode] = useState(false);
  const input = useRef<HTMLInputElement>();

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
        <RawTextInputWithRef
          ref={input}
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
