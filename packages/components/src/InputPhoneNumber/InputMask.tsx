import React, { ReactElement, cloneElement } from "react";
import styles from "./InputMask.module.css";
import { useInputMask } from "./useInputMask";
import { FormFieldProps } from "../FormField";

interface MaskElementProps {
  readonly isMasking: boolean;
  readonly formattedValue: string;
  readonly placeholderMask: string;
}

export function MaskElement({
  isMasking,
  formattedValue,
  placeholderMask,
}: MaskElementProps) {
  if (!isMasking) {
    return null;
  }

  return (
    <div className={styles.mask} aria-hidden="true">
      <span className={styles.hiddenValue}>{formattedValue}</span>
      <span>{placeholderMask}</span>
    </div>
  );
}

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
  const { placeholderMask, isMasking, formattedValue, maskedOnChange } =
    useInputMask({
      value: String(inputValue || ""),
      pattern,
      delimiter,
      strict,
      onChange: onChange,
    });

  const inputMask = (
    <MaskElement
      isMasking={isMasking}
      formattedValue={formattedValue}
      placeholderMask={placeholderMask}
    />
  );

  return cloneElement(children, {
    onChange: maskedOnChange,
    children: inputMask,
  });
}
