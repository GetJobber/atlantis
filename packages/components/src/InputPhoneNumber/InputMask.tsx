import React, { ReactElement, cloneElement } from "react";
import styles from "./InputMask.css";
import { FormFieldProps } from "../FormField";

interface InputMaskProps {
  readonly mask: string;
  readonly delimiter?: string;
  readonly children: ReactElement<FormFieldProps>;
}

export function InputMask({ mask, delimiter = "*", children }: InputMaskProps) {
  return (
    <div className={styles.container}>
      {cloneElement(children, { onChange: handleChange })}
      <div className={styles.mask} aria-hidden="true">
        <span style={{ opacity: 0 }}>{String(children.props.value)}</span>
        {placeholderValue()}
      </div>
    </div>
  );

  function placeholderValue() {
    return mask
      .replace(new RegExp(`\\${delimiter}`, "g"), "_")
      .slice(String(children.props.value).length);
  }

  function handleChange(value: string) {
    const pattern = mask.split("");
    const specialChars = pattern.filter(char => char !== delimiter);
    const cleanVal = value
      .split("")
      .filter(char => !specialChars.includes(char));
    const newMaskedValue = pattern.reduce((result, item) => {
      if (!cleanVal.length) return result;
      if (specialChars.includes(item)) return result + item;
      if (item === delimiter) return result + cleanVal.shift();
      return result;
    }, "");

    children.props.onChange?.(newMaskedValue);
  }
}
