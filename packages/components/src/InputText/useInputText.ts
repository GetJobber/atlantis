import React, { useId } from "react";
import { omit } from "lodash";
import { useInputTextActions } from "./useInputTextActions";
import { useInputTextFormField } from "./useInputTextFormField";
import {
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";

export function useInputText(props) {
  const inputTextRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(
    null,
  );

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const legacyPropHelper = {
    ...props,
    version: 1,
  };
  const id = useInputTextId(props);
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

  const baseProps = {
    disabled: props.disabled,
    size: props.size,
    inline: props.inline,
    autofocus: props.autoFocus,
    name: name,
    error: props.error ?? "",
    invalid: Boolean(props.error || props.invalid),
    identifier: id,
    descriptionIdentifier: descriptionIdentifier,
    description: props.description,
    clearable: props.clearable ?? "never",
    onClear: handleClear,
    wrapperRef: wrapperRef,
    type: props.multiline ? "textarea" : "text",
    placeholder: props.placeholder,
    value: props.value,
    prefix: props.prefix,
    suffix: props.suffix,
  };

  return { inputTextRef, wrapperRef, baseProps, inputStyle, fieldProps };
}

function useInputTextId(props) {
  const generatedId = useId();

  return props.id || generatedId;
}
