import React, {
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { useShowClear } from "@jobber/hooks/useShowClear";
import { FormFieldProps } from "./FormFieldTypes";
import styles from "./FormField.css";
import { AffixIcon, AffixLabel } from "./FormFieldAffix";
import { FormFieldDescription } from "./FormFieldDescription";
import { ClearAction } from "./components/ClearAction";
import { InputValidation } from "../InputValidation";

interface FormFieldWrapperProps extends FormFieldProps {
  readonly error: string;
  readonly identifier: string;
  readonly descriptionIdentifier: string;
  readonly clearable: "never" | "always";
  readonly onClear: () => void;
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
  onClear,
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

  const [focused, setFocused] = useState(false);

  const showClear = useShowClear({
    clearable,
    multiline: type === "textarea",
    focused,
    hasValue: Boolean(value),
    disabled,
  });

  return (
    <div
      className={containerClasses}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
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
        </div>
        {suffix?.label && (
          <AffixLabel {...suffix} labelRef={suffixRef} variation="suffix" />
        )}
        {showClear && <ClearAction onClick={onClear} />}
        {suffix?.icon && (
          <AffixIcon {...suffix} variation="suffix" size={size} />
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
