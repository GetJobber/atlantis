import classnames from "classnames";
import type { RefObject } from "react";
import { useEffect, useState } from "react";
import { useIsSafari } from "./useIsSafari";
import styles from "../FormField.module.css";
import type { FormFieldProps } from "../FormFieldTypes";

export interface useFormFieldWrapperStylesProps
  extends Pick<
    FormFieldProps,
    | "size"
    | "align"
    | "placeholder"
    | "value"
    | "invalid"
    | "maxLength"
    | "type"
    | "disabled"
    | "inline"
  > {
  readonly error?: string;
  /**
   * Maximum numerical or date value
   * In v2 components, this is typically undefined.
   */
  readonly max?: number | string;
  suffixRef?: RefObject<HTMLDivElement>;
  prefixRef?: RefObject<HTMLDivElement>;
  showMiniLabel?: boolean;
}

export interface LabelPadding {
  paddingLeft: number | string | undefined;
  paddingRight: number | string | undefined;
}

/**
 * Hook for getting the correct styles for the FormField and its children
 */
export function useFormFieldWrapperStyles({
  size,
  align,
  placeholder,
  value,
  invalid,
  error,
  max,
  prefixRef,
  suffixRef,
  maxLength,
  type,
  disabled,
  inline,
  showMiniLabel = true,
}: useFormFieldWrapperStylesProps) {
  const isSafari = useIsSafari();
  const wrapperClasses = classnames(
    styles.wrapper,
    size && styles[size],
    align && styles[align],
    {
      [styles.miniLabel]:
        (showMiniLabel && placeholder && value !== "") ||
        (placeholder && type === "select") ||
        // Naively assume that if the the type is tel, it is the InputPhoneNumber
        (placeholder && type === "tel"),
      [styles.text]: type === "textarea" || type === "text",
      [styles.textarea]: type === "textarea",
      [styles.safari]: isSafari && type === "textarea",
      [styles.select]: type === "select",
      [styles.invalid]: invalid ?? error,
      [styles.disabled]: disabled,
      [styles.maxLength]: maxLength,
      [styles.timeInputLabel]:
        placeholder && type === "time" && placeholder && value === "",
    },
  );
  const containerClasses = classnames(styles.container, {
    [styles.inline]: inline,
  });

  const wrapperInlineStyle = {
    ["--formField-maxLength" as string]: maxLength || max,
  };

  const [labelStyle, setLabelStyle] = useState<LabelPadding>({
    paddingLeft: undefined,
    paddingRight: undefined,
  });

  useEffect(() => {
    setLabelStyle(
      getAffixPaddding({
        value,
        type,
        prefixWidth: prefixRef?.current?.offsetWidth || 0,
        suffixWidth: suffixRef?.current?.offsetWidth || 0,
      }),
    );
  }, [value]);

  return {
    inputStyle: styles.input,
    wrapperClasses,
    containerClasses,
    wrapperInlineStyle,
    labelStyle,
    setLabelStyle,
  };
}

export interface GetAffixProps extends FormFieldProps {
  prefixWidth: number;
  suffixWidth: number;
}

export function getAffixPaddding({
  value,
  type,
  prefixWidth,
  suffixWidth,
}: GetAffixProps) {
  const hasValue = value !== "";
  const newPadding: LabelPadding = {
    paddingLeft: undefined,
    paddingRight: undefined,
  };

  // Naively assume that if the the type is tel, it is the InputPhoneNumber
  if (type === "tel") return newPadding;

  if (prefixWidth && !hasValue) {
    newPadding.paddingLeft = offset(prefixWidth);
  }

  if (suffixWidth && !hasValue) {
    newPadding.paddingRight = offset(suffixWidth);
  }

  function offset(width: number) {
    return `calc(${width}px + var(--space-smallest)`;
  }

  return newPadding;
}
