import React, { forwardRef, useEffect, useId } from "react";
import { Clearable } from "@jobber/hooks";
import {
  FormFieldWrapper,
  FormFieldWrapperHookProps,
  useFormFieldWrapperStyles,
} from "../FormField/FormFieldWrapper";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";
import {
  AutocompleteTypes,
  FormFieldTypes,
  useAtlantisFormField,
  useAtlantisFormFieldActions,
  useAtlantisFormFieldName,
} from "../FormField";

export const InputTextSPAR = forwardRef(function InputTextInternal(
  props: InputTextRebuiltProps,
  inputRefs: React.Ref<HTMLInputElement>,
) {
  const legacyPropHelper = {
    prefixWidth: 0,
    suffixWidth: 0,
    ...props,
    version: 1,
  };
  const id = useId();

  const [value, setValue] = React.useState(props.value || "");

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  const { inputStyle } = useFormFieldWrapperStyles({
    ...(legacyPropHelper as FormFieldWrapperHookProps),
  });

  const { name } = useAtlantisFormFieldName({
    nameProp: props.name,
    id: props.id || id,
  });

  const {
    handleChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
    handleValidation,
  } = useAtlantisFormFieldActions({
    name,
    onChange: props.onChange as
      | ((
          newValue: string | number | boolean | Date,
          event?:
            | React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
              >
            | undefined,
        ) => void)
      | undefined,
    onBlur: props.onBlur as (() => void) | undefined,
    onFocus: props.onFocus as () => void,
    onControllerBlur: () => ({}),
    onControllerChange: () => ({}),
    type: "text",
    setValue,
  });

  const { fieldProps } = useAtlantisFormField({
    id,
    name,
    rest: {},
    validations: false,
    handleChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
    handleValidation,
    errorMessage: "",
  });

  return (
    <FormFieldWrapper
      name={name}
      error={props.error ?? ""}
      identifier={id}
      descriptionIdentifier={props["aria-describedby"] ?? ""}
      clearable={props.clearable ?? "never"}
      onClear={props.onClear ?? (() => ({}))}
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

export interface InputTextRebuiltProps
  extends React.InputHTMLAttributes<never> {
  readonly error?: string;
  readonly identifier?: string;
  readonly autocomplete?: boolean | AutocompleteTypes;
  readonly loading?: boolean;
  readonly onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  readonly children?: React.ReactNode;
  readonly clearable?: Clearable;
  readonly onClear?: () => void;
  readonly type?: FormFieldTypes;
  readonly version: 2;
}
