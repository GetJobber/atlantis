import React, {
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { Clearable, useShowClear } from "@jobber/hooks/useShowClear";
import { FormFieldProps } from "./FormFieldTypes";
import styles from "./FormField.module.css";
import { AffixIcon, AffixLabel } from "./FormFieldAffix";
import { FormFieldDescription } from "./FormFieldDescription";
import { ClearAction } from "./components/ClearAction";
import { useFormFieldFocus } from "./hooks/useFormFieldFocus";
import { useIsSafari } from "./hooks/useIsSafari";
import { InputValidation } from "../InputValidation";

interface FormFieldWrapperProps extends FormFieldProps {
  readonly error: string;
  readonly identifier: string;
  readonly descriptionIdentifier: string;
  readonly clearable: Clearable;
  readonly onClear: () => void;
}

interface LabelPadding {
  paddingLeft: number | string | undefined;
  paddingRight: number | string | undefined;
}

// eslint-disable-next-line max-statements
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
  inputRef,
  onClear,
  toolbar,
  toolbarVisibility = "while-editing",
  wrapperRef,
}: PropsWithChildren<FormFieldWrapperProps>) {
  const isSafari = useIsSafari();
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

  const prefixRef = useRef() as RefObject<HTMLDivElement>;
  const suffixRef = useRef() as RefObject<HTMLDivElement>;

  const [labelStyle, setLabelStyle] = useState<LabelPadding>({
    paddingLeft: undefined,
    paddingRight: undefined,
  });

  useEffect(() => {
    setLabelStyle(getAffixPaddding);
  }, [value]);

  const { focused } = useFormFieldFocus({ wrapperRef });

  const showClear = useShowClear({
    clearable,
    multiline: type === "textarea",
    focused,
    hasValue: Boolean(value),
    disabled,
  });

  return (
    <div className={containerClasses}>
      <div
        className={wrapperClasses}
        style={wrapperInlineStyle}
        data-testid="Form-Field-Wrapper"
        ref={wrapperRef}
      >
        <div className={styles.horizontalWrapper}>
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

            <div className={styles.childrenWrapper} tabIndex={-1}>
              {children}
            </div>

            {suffix?.label && (
              <AffixLabel {...suffix} labelRef={suffixRef} variation="suffix" />
            )}
          </div>
          {showClear && <ClearAction onClick={onClear} />}
          {suffix?.icon && (
            <AffixIcon {...suffix} variation="suffix" size={size} />
          )}
        </div>
        {toolbar && (
          <div
            onFocus={() => {
              inputRef?.current?.focus();
            }}
            tabIndex={-1}
            className={classnames(styles.toolbar, {
              [styles.alwaysVisible]: toolbarVisibility === "always",
            })}
            data-testid="ATL-InputText-Toolbar"
          >
            {toolbar}
          </div>
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
