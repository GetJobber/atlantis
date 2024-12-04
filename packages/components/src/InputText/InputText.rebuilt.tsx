import React, { forwardRef, useId } from "react";
import { InputTextRebuiltProps } from "./InputText.types";
import { useInputTextActions } from "./useInputTextActions";
import { useInputTextFormField } from "./useInputTextFormField";
import {
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";

// eslint-disable-next-line max-statements
export const InputTextSPAR = forwardRef(function InputTextInternal(
  props: InputTextRebuiltProps,
  inputRefs: React.Ref<HTMLInputElement>,
) {
  const inputTextRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(
    null,
  );

  const legacyPropHelper = {
    ...props,
    version: 1,
  };
  const id = useId();

  const [value, setValue] = React.useState(props.value || "");

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

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

  const { fieldProps } = useInputTextFormField({
    id,
    name,
    handleChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
    errorMessage: "",
  });

  return (
    <FormFieldWrapper
      name={name}
      error={props.error ?? ""}
      identifier={id}
      descriptionIdentifier={props["aria-describedby"] ?? ""}
      clearable={props.clearable ?? "never"}
      onClear={handleClear}
      type={props.type}
      placeholder={props.placeholder}
      value={value as string}
    >
      <>
        <input
          {...fieldProps}
          name={name}
          ref={inputRefs}
          className={inputStyle}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <FormFieldPostFix
          variation="spinner"
          visible={props.loading ?? false}
        />
        {props.children}
      </>
    </FormFieldWrapper>
  );
});
