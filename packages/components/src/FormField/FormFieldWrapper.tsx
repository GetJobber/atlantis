import type { PropsWithChildren, ReactNode, RefObject } from "react";
import React, { useRef } from "react";
import type { Clearable } from "@jobber/hooks";
import { useShowClear } from "@jobber/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { tokens } from "@jobber/design";
import type { FormFieldProps } from "./FormFieldTypes";
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
  readonly onClear?: () => void;
  readonly showMiniLabel?: boolean;
  readonly readonly?: boolean;
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
  readonly,
  toolbar,
  toolbarVisibility = "while-editing",
  showMiniLabel = true,
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
      showMiniLabel,
    });

  const { focused } = useFormFieldFocus({ wrapperRef });

  const showClear = useShowClear({
    clearable,
    multiline: type === "textarea",
    focused,
    hasValue: Boolean(value),
    disabled,
    readonly,
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
            {(showMiniLabel || !value) && (
              <FormFieldLabel
                htmlFor={identifier}
                style={
                  prefixRef?.current || suffixRef?.current
                    ? labelStyle
                    : undefined
                }
              >
                {placeholder}
              </FormFieldLabel>
            )}
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

/**
 * @internal Reach out to UX Foundations if using this component since it is possible it might change
 */
export function FormFieldInputHorizontalWrapper({
  children,
}: PropsWithChildren) {
  return <div className={styles.horizontalWrapper}>{children}</div>;
}

/**
 * @internal Reach out to UX Foundations if using this component since it is possible it might change
 */
export function FormFieldInputWrapperStyles({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <div className={styles.inputWrapper}>{children}</div>;
}

/**
 * @internal Reach out to UX Foundations if using this component since it is possible it might change
 */
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
  children,
  htmlFor,
  style,
  external = false,
}: {
  readonly children?: ReactNode;
  readonly htmlFor?: string;
  readonly style?: React.CSSProperties;
  readonly external?: boolean;
}) {
  if (!children) return null;

  return (
    <label
      className={external ? styles.externalLabel : styles.label}
      htmlFor={htmlFor}
      style={style}
    >
      {children}
    </label>
  );
}

/**
 * @internal Reach out to UX Foundations if using this component since it is possible it might change
 */
export function FormFieldWrapperToolbar({
  toolbar,
  isToolbarVisible,
  toolbarAnimationEnd,
  toolbarAnimationStart,
  toolbarVisibility,
}: {
  readonly toolbarVisibility: string;
  readonly isToolbarVisible: boolean;
  readonly toolbarAnimationEnd: {
    opacity: number;
    maxHeight: number;
    overflow: string;
  };
  readonly toolbarAnimationStart: {
    opacity: number;
    maxHeight: string;
    overflow: string;
  };
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
