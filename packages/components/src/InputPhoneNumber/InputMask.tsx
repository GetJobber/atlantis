import React, { ReactElement, cloneElement, useState } from "react";
import styles from "./InputMask.css";
import { FormFieldProps } from "../FormField";

export interface InputMaskProps {
  /**
   * A string pattern to mask the value. For example:
   *
   * - Phone number: `(***) ***-*****` = `(555) 123-3456`
   * - Hours and minutes: `**:**` = `01:20`
   *
   * By default, a `*` is used to indicate where a value would be in place. To
   * change that, use the `delimiter` prop.
   */
  readonly pattern: string;

  /**
   * Change the delimiter when you need to have a `*` as a value that the input
   * returns. For example, you want your pattern to have a `*` in it.
   *
   * ```
   * <InputMask pattern="n*n=n" delimiter="n" />
   * ```
   *
   * It would now replace `n` with the value you type and end up with `1*2=2` if
   * you give a value of `122`.
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
  const [isMasking, setIsMasking] = useState(!inputValue);
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
    children: isMasking && inputMask,
  });

  function handleChange(value: string): void {
    onChange?.(formatValue(value));
  }

  function formatValue(value: string): string {
    const { cleanValueChars, patternChars, specialChars, isOverCharLimit } =
      getMaskingInfo(value);

    if (!strict && isOverCharLimit) {
      setIsMasking(false);
      return cleanValueChars.join("");
    } else {
      setIsMasking(true);
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
      // Since this is only used in InputPhoneNumber, we can restrict it to
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
