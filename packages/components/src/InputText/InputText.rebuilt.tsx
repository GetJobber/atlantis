import React, { forwardRef } from "react";
import { InputTextRebuiltProps } from "./InputText.types";
import { useTextAreaResize } from "./useTextAreaResize";
import { useInputText } from "./useInputText";
import { UseInputTextFormFieldReturn } from "./useInputTextFormField";
import { FormFieldWrapper } from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";
import { mergeRefs } from "../utils/mergeRefs";

export const InputTextSPAR = forwardRef(function InputTextInternal(
  props: InputTextRebuiltProps,
  inputRefs: React.Ref<HTMLInputElement | HTMLTextAreaElement>,
) {
  const { baseProps, inputStyle, fieldProps, inputTextRef, wrapperRef } =
    useInputText(props);

  const { rowRange } = useTextAreaResize({
    rows: props.rows,
    value: props.value,
    inputRef: inputTextRef,
    wrapperRef: wrapperRef,
  });

  const type = props.multiline ? "textarea" : "text";

  return (
    <FormFieldWrapper
      {...baseProps}
      align={props.align}
      rows={rowRange.min}
      toolbar={props.toolbar}
      toolbarVisibility={props.toolbarVisibility}
      type={type}
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
