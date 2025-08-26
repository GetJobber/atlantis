import React, { forwardRef, useId } from "react";
import omit from "lodash/omit";
import type { InputTextRebuiltProps } from "./InputText.types";
import { useTextAreaResize } from "./useTextAreaResize";
import { useInputTextActions } from "./useInputTextActions";
import type { UseInputTextFormFieldReturn } from "./useInputTextFormField";
import { useInputTextFormField } from "./useInputTextFormField";
import {
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";
import { mergeRefs } from "../utils/mergeRefs";

export const InputTextSPAR = forwardRef(function InputTextInternal(
  props: InputTextRebuiltProps,
  inputRefs: React.Ref<HTMLInputElement | HTMLTextAreaElement>,
) {
  const inputTextRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(
    null,
  );

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const legacyPropHelper = {
    ...props,
    version: 1,
  };

  const id = useInputTextId(props);

  const { rowRange } = useTextAreaResize({
    rows: props.rows,
    value: props.value,
    inputRef: inputTextRef,
    wrapperRef: wrapperRef,
  });

  const type = props.multiline ? "textarea" : "text";

  const { inputStyle } = useFormFieldWrapperStyles(legacyPropHelper);

  const { name } = useAtlantisFormFieldName({
    nameProp: props.name,
    id: id,
  });

  const { handleChange, handleBlur, handleFocus, handleKeyDown, handleClear } =
    useInputTextActions({
      onChange: props.onChange,
      onBlur: props.onBlur,
      onFocus: props.onFocus,
      onKeyDown: props.onKeyDown,
      onEnter: props.onEnter,
      inputRef: inputTextRef,
    });

  const inputProps = omit(props, [
    "onChange",
    "onBlur",
    "onFocus",
    "onEnter",
    "size",
    "placeholder",
    "multiline",
    "prefix",
    "suffix",
    "version",
  ]);

  const { fieldProps, descriptionIdentifier } = useInputTextFormField({
    ...inputProps,
    id,
    name,
    handleChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
  });

  return (
    <FormFieldWrapper
      disabled={props.disabled}
      size={props.size}
      align={props.align}
      inline={props.inline}
      autofocus={props.autoFocus}
      name={name}
      wrapperRef={wrapperRef}
      error={props.error ?? ""}
      invalid={Boolean(props.error || props.invalid)}
      identifier={id}
      descriptionIdentifier={descriptionIdentifier}
      description={props.description}
      clearable={props.clearable ?? "never"}
      onClear={handleClear}
      type={props.multiline ? "textarea" : "text"}
      placeholder={props.placeholder}
      value={props.value}
      prefix={props.prefix}
      suffix={props.suffix}
      rows={rowRange.min}
      toolbar={props.toolbar}
      toolbarVisibility={props.toolbarVisibility}
    >
      <>
        {type === "textarea" ? (
          <TextArea
            fieldProps={fieldProps}
            rowRange={rowRange}
            inputRefs={[inputRefs, inputTextRef]}
            value={props.value}
            inputStyle={inputStyle}
          />
        ) : (
          <TextInput
            fieldProps={fieldProps}
            inputRefs={[inputRefs, inputTextRef]}
            value={props.value}
            inputStyle={inputStyle}
          />
        )}
        <FormFieldPostFix
          variation="spinner"
          visible={props.loading ?? false}
        />
        {props.children}
      </>
    </FormFieldWrapper>
  );
});

function useInputTextId(props: InputTextRebuiltProps) {
  const generatedId = useId();

  return props.id || generatedId;
}

function TextArea({
  fieldProps,
  rowRange,
  inputRefs,
  value,
  inputStyle,
}: {
  readonly fieldProps: UseInputTextFormFieldReturn["fieldProps"];
  readonly rowRange: ReturnType<typeof useTextAreaResize>["rowRange"];
  readonly inputRefs: React.Ref<HTMLTextAreaElement | HTMLInputElement>[];
  readonly value: string;
  readonly inputStyle: string;
}) {
  return (
    <textarea
      {...fieldProps}
      rows={rowRange.min}
      ref={mergeRefs(inputRefs)}
      className={inputStyle}
      value={value}
    />
  );
}

function TextInput({
  fieldProps,
  inputRefs,
  value,
  inputStyle,
}: {
  readonly fieldProps: UseInputTextFormFieldReturn["fieldProps"];
  readonly inputRefs: React.Ref<HTMLTextAreaElement | HTMLInputElement>[];
  readonly value: string;
  readonly inputStyle: string;
}) {
  return (
    <input
      {...fieldProps}
      ref={mergeRefs(inputRefs)}
      className={inputStyle}
      value={value}
    />
  );
}
