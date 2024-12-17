import React, { PropsWithChildren, ReactNode, RefObject, useRef } from "react";
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
import { useFormFieldWrapperStyles } from "./hooks/useFormFieldWrapperStyles";
import { InputValidation } from "../InputValidation";

export interface FormFieldWrapperProps extends FormFieldProps {
  readonly error: string;
  readonly identifier: string;
  readonly descriptionIdentifier: string;
  readonly clearable: Clearable;
  readonly onClear: () => void;
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
      prefixRef,
      suffixRef,
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
      disabled,
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
