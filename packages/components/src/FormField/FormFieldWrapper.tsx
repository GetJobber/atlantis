import React, {
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { FormFieldProps } from "./FormFieldTypes";
import styles from "./FormField.css";
import { AffixIcon, AffixLabel } from "./FormFieldAffix";
import { FormFieldDescription } from "./FormFieldDescription";
import { InputValidation } from "../InputValidation";
import { Icon } from "../Icon";

interface FormFieldWrapperProps extends FormFieldProps {
  readonly error: string;
  readonly identifier: string;
  readonly descriptionIdentifier: string;
}

interface LabelPadding {
  paddingLeft: number | string | undefined;
  paddingRight: number | string | undefined;
}

export function FormFieldWrapper({
  align,
  description,
  descriptionIdentifier,
  placeholder,
  value,
  children,
  invalid,
  error,
  size,
  prefix,
  suffix,
  max,
  maxLength,
  type,
  disabled,
  inline,
  identifier,
  clearable,
  onChange,
}: PropsWithChildren<FormFieldWrapperProps>) {
  const wrapperClasses = classnames(
    styles.wrapper,
    size && styles[size],
    align && styles[align],
    {
      [styles.miniLabel]:
        (placeholder && value !== "") ||
        (placeholder && type === "select") ||
        // Naively assume that if the the type is tel, it is the InputPhoneNumber
        (placeholder && type === "tel"),
      [styles.textarea]: type === "textarea",
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

  const prefixRef = useRef() as RefObject<HTMLDivElement>;
  const suffixRef = useRef() as RefObject<HTMLDivElement>;

  const [labelStyle, setLabelStyle] = useState<LabelPadding>({
    paddingLeft: undefined,
    paddingRight: undefined,
  });

  useEffect(() => {
    setLabelStyle(getAffixPaddding);
  }, [value]);

  return (
    <div className={containerClasses}>
      <div
        className={wrapperClasses}
        style={wrapperInlineStyle}
        data-testid="Form-Field-Wrapper"
      >
        {prefix?.icon && <AffixIcon {...prefix} size={size} />}
        <div className={styles.inputWrapper}>
          {placeholder && (
            <label
              className={styles.label}
              htmlFor={identifier}
              style={
                prefixRef?.current || suffixRef?.current
                  ? labelStyle
                  : undefined
              }
            >
              {placeholder}
            </label>
          )}

          {prefix?.label && <AffixLabel {...prefix} labelRef={prefixRef} />}
          <div className={styles.childrenWrapper}>{children}</div>
          {suffix?.label && (
            <AffixLabel {...suffix} labelRef={suffixRef} variation="suffix" />
          )}
        </div>
        {suffix?.icon && (
          <AffixIcon {...suffix} variation="suffix" size={size} />
        )}
        {clearable && value && (
          <button
            className={styles.clearInput}
            onClick={onChange && (() => onChange(""))}
            type="button"
            data-testid="ATL-Input-Time-Clear"
            aria-label="Clear input"
          >
            <Icon name="remove" size="small" />
          </button>
        )}
      </div>
      {description && !inline && (
        <FormFieldDescription
          id={descriptionIdentifier}
          description={description}
        />
      )}
      {error && !inline && <InputValidation message={error} />}
    </div>
  );

  function getAffixPaddding() {
    const hasValue = value !== "";
    const newPadding: LabelPadding = {
      paddingLeft: undefined,
      paddingRight: undefined,
    };

    // Naively assume that if the the type is tel, it is the InputPhoneNumber
    if (type === "tel") return newPadding;

    if (prefixRef?.current && !hasValue) {
      const { offsetWidth } = prefixRef.current;
      newPadding.paddingLeft = offset(offsetWidth);
    }

    if (suffixRef?.current && !hasValue) {
      const { offsetWidth } = suffixRef.current;
      newPadding.paddingRight = offset(offsetWidth);
    }

    function offset(width: number) {
      return `calc(${width}px + var(--space-smallest)`;
    }

    return newPadding;
  }
}
