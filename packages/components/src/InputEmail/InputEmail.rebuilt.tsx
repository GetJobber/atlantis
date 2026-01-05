import React, { forwardRef, useId, useRef } from "react";
import { useInputEmailActions } from "./hooks/useInputEmailActions";
import type { InputEmailRebuiltProps } from "./InputEmail.types";
import { FormFieldWrapper, useAtlantisFormFieldName } from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";
import { filterDataAttributes } from "../sharedHelpers/filterDataAttributes";
import formFieldStyles from "../FormField/FormField.module.css";

export const InputEmailRebuilt = forwardRef(function InputEmailInternal(
  props: InputEmailRebuiltProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const generatedId = useId();
  const id = props.id || generatedId;
  const inputRef =
    (ref as React.RefObject<HTMLInputElement>) ??
    useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { name } = useAtlantisFormFieldName({
    nameProp: props.name,
    id,
  });

  const {
    handleChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
    handleKeyUp,
    handleClear,
    handleClick,
    handleMouseDown,
    handleMouseUp,
    handlePointerDown,
    handlePointerUp,
  } = useInputEmailActions({
    onChange: props.onChange,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    onKeyDown: props.onKeyDown,
    onKeyUp: props.onKeyUp,
    onEnter: props.onEnter,
    onClick: props.onClick,
    onMouseDown: props.onMouseDown,
    onMouseUp: props.onMouseUp,
    onPointerDown: props.onPointerDown,
    onPointerUp: props.onPointerUp,
    inputRef,
  });

  const descriptionIdentifier = `descriptionUUID--${id}`;
  const descriptionVisible = props.description && !props.inline;
  const isInvalid = Boolean(props.error || props.invalid);
  const dataAttrs = filterDataAttributes(props);

  return (
    <FormFieldWrapper
      error={props.error || ""}
      invalid={props.invalid}
      identifier={id}
      descriptionIdentifier={descriptionIdentifier}
      size={props.size}
      inline={props.inline}
      align={props.align}
      prefix={props.prefix}
      suffix={props.suffix}
      description={props.description}
      clearable={props.clearable ?? "never"}
      onClear={handleClear}
      readonly={props.readOnly}
      wrapperRef={wrapperRef}
      disabled={props.disabled}
      type="email"
      value={props.value}
      placeholder={props.placeholder}
      name={name}
    >
      <input
        id={id}
        name={name}
        type="email"
        ref={inputRef}
        className={formFieldStyles.input}
        value={props.value}
        disabled={props.disabled}
        readOnly={props.readOnly}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
        pattern={props.pattern}
        inputMode={props.inputMode}
        tabIndex={props.tabIndex}
        role={props.role}
        aria-label={props["aria-label"]}
        aria-describedby={
          descriptionVisible ? descriptionIdentifier : props["aria-describedby"]
        }
        aria-invalid={isInvalid ? true : undefined}
        aria-controls={props["aria-controls"]}
        aria-expanded={props["aria-expanded"]}
        aria-activedescendant={props["aria-activedescendant"]}
        aria-autocomplete={props["aria-autocomplete"]}
        aria-required={props["aria-required"]}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        data-testid="ATL-InputEmail-input"
        {...dataAttrs}
      />
      <FormFieldPostFix variation="spinner" visible={props.loading ?? false} />
    </FormFieldWrapper>
  );
});
