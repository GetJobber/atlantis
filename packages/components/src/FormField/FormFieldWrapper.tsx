import React, {
  PropsWithChildren,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { Clearable, useShowClear } from "@jobber/hooks/useShowClear";
import { AnimatePresence, motion } from "framer-motion";
import { tokens } from "@jobber/design";
import { FormFieldProps } from "./FormFieldTypes";
import styles from "./FormField.module.css";
import { AffixIcon, AffixLabel } from "./FormFieldAffix";
import { FormFieldDescription } from "./FormFieldDescription";
import { ClearAction } from "./components/ClearAction";
import { useToolbar } from "./hooks/useToolbar";
import { useFormFieldFocus } from "./hooks/useFormFieldFocus";
import { useIsSafari } from "./hooks/useIsSafari";
import { InputValidation } from "../InputValidation";

export interface FormFieldWrapperProps extends FormFieldProps {
  readonly error: string;
  readonly identifier: string;
  readonly descriptionIdentifier: string;
  readonly clearable: Clearable;
  readonly onClear: () => void;
}

export interface LabelPadding {
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
  onClear,
  toolbar,
  toolbarVisibility = "while-editing",
  wrapperRef,
}: PropsWithChildren<FormFieldWrapperProps>) {
  const prefixRef = useRef() as RefObject<HTMLDivElement>;
  const suffixRef = useRef() as RefObject<HTMLDivElement>;

  const { wrapperClasses, containerClasses, wrapperInlineStyle, labelStyle } =
    useFormFieldWrapperStyles({
      align,
      max,
      maxLength,
      prefixWidth: prefixRef?.current?.offsetWidth ?? 0,
      suffixWidth: suffixRef?.current?.offsetWidth ?? 0,
      placeholder,
      value,
      invalid,
      error,
      type,
      disabled,
      inline,
      size,
    });

  const { focused } = useFormFieldFocus({ wrapperRef });

  const showClear = useShowClear({
    clearable,
    multiline: type === "textarea",
    focused,
    hasValue: Boolean(value),
    disabled,
  });

  const { isToolbarVisible, toolbarAnimationEnd, toolbarAnimationStart } =
    useToolbar({
      focused,
      toolbar,
      toolbarVisibility,
    });

  return (
    <div className={containerClasses}>
      <div
        className={wrapperClasses}
        style={wrapperInlineStyle}
        data-testid="Form-Field-Wrapper"
        ref={wrapperRef}
      >
        <FormFieldInputHorizontalWrapper>
          <AffixIcon {...prefix} size={size} />
          <FormFieldInputWrapperStyles>
            <FormFieldLabel
              placeholder={placeholder}
              identifier={identifier}
              style={
                prefixRef?.current || suffixRef?.current
                  ? labelStyle
                  : undefined
              }
            />
            <AffixLabel {...prefix} labelRef={prefixRef} />

            <FormFieldWrapperMain>{children}</FormFieldWrapperMain>

            <AffixLabel {...suffix} labelRef={suffixRef} variation="suffix" />
          </FormFieldInputWrapperStyles>
          <ClearAction onClick={onClear} visible={showClear} />
          <AffixIcon {...suffix} variation="suffix" size={size} />
        </FormFieldInputHorizontalWrapper>
        <FormFieldWrapperToolbar
          toolbarVisibility={toolbarVisibility}
          isToolbarVisible={isToolbarVisible}
          toolbarAnimationEnd={toolbarAnimationEnd}
          toolbarAnimationStart={toolbarAnimationStart}
          toolbar={toolbar}
        />
      </div>
      <FormFieldDescription
        visible={!!description && !inline}
        id={descriptionIdentifier}
        description={description}
      />
      <InputValidation message={error} visible={!!error && !inline} />
    </div>
  );
}
export interface FormFieldWrapperHookProps extends FormFieldProps {
  error: string;
  suffixWidth: number;
  prefixWidth: number;
}

export function useFormFieldWrapperStyles({
  size,
  align,
  placeholder,
  value,
  invalid,
  error,
  max,
  prefixWidth,
  suffixWidth,
  maxLength,
  type,
  disabled,
  inline,
}: FormFieldWrapperHookProps) {
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

  const [labelStyle, setLabelStyle] = useState<LabelPadding>({
    paddingLeft: undefined,
    paddingRight: undefined,
  });

  useEffect(() => {
    setLabelStyle(
      getAffixPaddding({
        value,
        type,
        prefixWidth,
        suffixWidth,
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

export function FormFieldInputHorizontalWrapper({
  children,
}: PropsWithChildren) {
  return <div className={styles.horizontalWrapper}>{children}</div>;
}

export function FormFieldInputWrapperStyles({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div className={styles.inputWrapper}>{children}</div>;
}

export function FormFieldWrapperMain({
  children,
  tabIndex = -1,
}: {
  readonly children: React.ReactNode;
  readonly tabIndex?: number;
}) {
  return (
    <div className={styles.childrenWrapper} tabIndex={tabIndex}>
      {children}
    </div>
  );
}

export function FormFieldLabel({
  placeholder,
  identifier,
  style,
}: {
  readonly placeholder?: string;
  readonly identifier?: string;
  readonly style?: React.CSSProperties;
}) {
  if (!placeholder) return null;

  return (
    <label className={styles.label} htmlFor={identifier} style={style}>
      {placeholder}
    </label>
  );
}

export function FormFieldWrapperToolbar({
  toolbar,
  isToolbarVisible,
  toolbarAnimationEnd,
  toolbarAnimationStart,
  toolbarVisibility,
}: {
  readonly toolbarVisibility: string;
  readonly isToolbarVisible: boolean;
  readonly toolbarAnimationEnd: { opacity: number; height: number };
  readonly toolbarAnimationStart: { opacity: number; height: string | number };
  readonly toolbar: ReactNode;
}) {
  return (
    <AnimatePresence initial={toolbarVisibility === "always" ? false : true}>
      {isToolbarVisible && (
        <motion.div
          key="toolbar"
          initial={toolbarAnimationEnd}
          animate={toolbarAnimationStart}
          exit={toolbarAnimationEnd}
          transition={{
            duration: tokens["timing-base"] / 1000,
            ease: "easeInOut",
          }}
          tabIndex={-1}
        >
          <div className={styles.toolbar} data-testid="ATL-InputText-Toolbar">
            {toolbar}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
