import React, { ReactElement, cloneElement, useState } from "react";
import styles from "./InputMask.css";
import { FormFieldProps } from "../FormField";

export interface InputMaskProps {
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

  /**
   * Allow/prevent users adding from more value than the desired pattern.
   * For example, your pattern could accept 10 characters. If it's strict, your
   * users can only type 10 characters.
   *
   * @default true
   */
  readonly strict?: boolean;

  readonly children: ReactElement<FormFieldProps>;
}

export function InputMask({
  children,
  delimiter = "*",
  pattern,
  strict = true,
}: InputMaskProps) {
  const { value: inputValue, onChange } = children.props;
  const [hasMask, setHasMask] = useState(!inputValue);
  const stringifiedValue = String(inputValue || "");
  const placeholderValue = pattern
    .replace(new RegExp(`\\${delimiter}`, "g"), "_")
    .slice(stringifiedValue.length);

  const inputMask = (
    <div className={styles.mask} aria-hidden="true">
      <span className={styles.hiddenValue}>{stringifiedValue}</span>
      {placeholderValue}
    </div>
  );

  return cloneElement(children, {
    onChange: handleChange,
    children: hasMask && inputMask,
  });

  function handleChange(value: string): void {
    onChange?.(formatValue(value));
  }

  function formatValue(value: string): string {
    const { cleanValueChars, patternChars, specialChars, isOverCharLimit } =
      getMaskingInfo(value);

    if (!strict && isOverCharLimit) {
      setHasMask(false);
      return cleanValueChars.join("");
    } else {
      setHasMask(true);
      return patternChars.reduce(
        getMaskedValue(cleanValueChars, specialChars),
        "",
      );
    }
  }

  function getMaskingInfo(value: string) {
    const patternChars = pattern.split("");
    const specialChars = patternChars.filter(char => char !== delimiter);

    const cleanValueChars = value
      .split("")
      .filter(char => !specialChars.includes(char))
      // Since this is only used in phone number, we can restrict it to
      // just numbers for now.
      .map(Number)
      .filter(num => !isNaN(num));

    const isOverCharLimit =
      cleanValueChars.length > patternChars.length - specialChars.length;

    return { cleanValueChars, patternChars, specialChars, isOverCharLimit };
  }
}

function getMaskedValue(cleanVal: number[], specialChars: string[]) {
  return (result: string, nextCharacter: string) => {
    if (!cleanVal.length) return result;
    if (specialChars.includes(nextCharacter)) return result + nextCharacter;

    const nextValue = cleanVal.shift();
    return result + nextValue;
  };
}
