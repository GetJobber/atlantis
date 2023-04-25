import React, { ReactElement, cloneElement } from "react";
import styles from "./InputMask.css";
import { FormFieldProps } from "../FormField";

interface InputMaskProps {
  readonly pattern: string;
  readonly delimiter?: string;
  readonly children: ReactElement<FormFieldProps>;
}

export function InputMask({
  pattern,
  delimiter = "*",
  children,
}: InputMaskProps) {
  const { value: inputValue, onChange } = children.props;
  const placeholderValue = pattern
    .replace(new RegExp(`\\${delimiter}`, "g"), "_")
    .slice(String(inputValue).length);

  return (
    <>
      {cloneElement(children, {
        onChange: handleChange,
        children: (
          <div className={styles.mask} aria-hidden="true">
            <span style={{ opacity: 0 }}>{String(inputValue)}</span>
            {placeholderValue}
          </div>
        ),
      })}
    </>
  );

  function handleChange(value: string) {
    const patternChars = pattern.split("");
    const specialChars = patternChars.filter(char => char !== delimiter);
    const cleanVal = value
      .split("")
      .filter(char => !specialChars.includes(char));
    const newMaskedValue = patternChars.reduce((result, item) => {
      if (!cleanVal.length) return result;
      if (specialChars.includes(item)) return result + item;
      if (item === delimiter) return result + cleanVal.shift();
      return result;
    }, "");

    onChange?.(newMaskedValue);
  }
}
