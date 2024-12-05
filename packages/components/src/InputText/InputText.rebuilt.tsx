import React, { forwardRef, useId } from "react";
import { useSafeLayoutEffect } from "@jobber/hooks";
import omit from "lodash/omit";
import { InputTextRebuiltProps } from "./InputText.types";
import { useTextAreaResize } from "./useTextAreaResize";
import { useInputTextActions } from "./useInputTextActions";
import {
  UseInputTextFormFieldReturn,
  useInputTextFormField,
} from "./useInputTextFormField";
import {
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";
import { mergeRefs } from "../utils/mergeRefs";

// eslint-disable-next-line max-statements
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
  const id = useId();

  const { resize, rowRange } = useTextAreaResize(props.rows);

  const type = props.multiline ? "textarea" : "text";

  const { inputStyle } = useFormFieldWrapperStyles(legacyPropHelper);

  const { name } = useAtlantisFormFieldName({
    nameProp: props.name,
    id: props.id || id,
  });

  const { handleChange, handleBlur, handleFocus, handleKeyDown, handleClear } =
    useInputTextActions({
      onChange: props.onChange,
      onBlur: props.onBlur,
      onFocus: props.onFocus,
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
    "prefix",
    "suffix",
    "version",
  ]);

  const { fieldProps } = useInputTextFormField({
    ...inputProps,
    id,
    name,
    handleChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
  });

  useSafeLayoutEffect(() => {
    resize(inputTextRef, wrapperRef);
  }, [inputTextRef.current, wrapperRef.current]);

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
      invalid={props.invalid}
      identifier={id}
      descriptionIdentifier={props["aria-describedby"] ?? ""}
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
