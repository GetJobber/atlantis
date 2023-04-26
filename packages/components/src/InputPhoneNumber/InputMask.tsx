import React, { ReactElement, cloneElement } from "react";
import styles from "./InputMask.css";
import { FormFieldProps } from "../FormField";

interface InputMaskProps {
  /**
   * Determines the masking pattern. By default, a `*` is used to be the value
   * you're expecting the user would type.
   */
  readonly pattern: string;

  /**
   * Change the delimiter when you need to have a `*` as a value that the input
   * returns.
   *
   * @default "*"
   */
  readonly delimiter?: string;

  readonly children: ReactElement<FormFieldProps>;
}

export function InputMask({
  pattern,
  delimiter = "*",
  children,
}: InputMaskProps) {
  const { value: inputValue, onChange } = children.props;
  const stringifiedValue = String(inputValue);
  const placeholderValue = pattern
    .replace(new RegExp(`\\${delimiter}`, "g"), "_")
    .slice(stringifiedValue.length);

  return cloneElement(children, {
    onChange: handleChange,
    children: (
      <div className={styles.mask} aria-hidden="true">
        <span className={styles.hiddenValue}>{stringifiedValue}</span>
        {placeholderValue}
      </div>
    ),
  });

  function handleChange(value: string) {
    const patternChars = pattern.split("");
    const specialChars = patternChars.filter(char => char !== delimiter);
    const cleanVal = value
      .split("")
      .filter(char => !specialChars.includes(char));
    const newMaskedValue = patternChars.reduce(
      getMaskedValue(cleanVal, specialChars, delimiter),
      "",
    );

    onChange?.(newMaskedValue);
  }
}

function getMaskedValue(
  cleanVal: string[],
  specialChars: string[],
  delimiter: string,
) {
  return (result: string, nextCharacter: string) => {
    if (!cleanVal.length) return result;
    if (specialChars.includes(nextCharacter)) return result + nextCharacter;

    if (nextCharacter === delimiter) {
      const nextValue = cleanVal.shift();

      // Since this is only used in phone number, we can restrict it to
      // just numbers for now.
      if (isNaN(Number(nextValue))) {
        return result;
      }

      return result + nextValue;
    }

    return result;
  };
}
