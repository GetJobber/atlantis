import type { Ref } from "react";
import React, { createRef, forwardRef, useImperativeHandle } from "react";
import type { RegisterOptions } from "react-hook-form";
import type { CommonFormFieldProps, FormFieldProps } from "../FormField";
import { FormField } from "../FormField";

export interface InputNumberProps
  extends Omit<CommonFormFieldProps, "version">,
    Pick<
      FormFieldProps,
      | "maxLength"
      | "autocomplete"
      | "max"
      | "min"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "inputRef"
      | "validations"
      | "readonly"
      | "defaultValue"
      | "keyboard"
      | "prefix"
      | "suffix"
    > {
  readonly value?: number;
  /**
   * Experimental:
   * Determine which version of the FormField to use.
   */
  readonly version?: 1;
}

export interface InputNumberRef {
  blur(): void;
  focus(): void;
}

function InputNumberInternal(
  props: InputNumberProps,
  ref: Ref<InputNumberRef>,
) {
  const inputRef = createRef<HTMLTextAreaElement | HTMLInputElement>();

  useImperativeHandle(ref, () => ({
    blur: () => {
      const input = inputRef.current;

      if (input) {
        input.blur();
      }
    },
    focus: () => {
      const input = inputRef.current;

      if (input) {
        input.focus();
      }
    },
  }));

  return (
    <FormField
      {...props}
      clearable={"never"}
      type="number"
      inputRef={inputRef}
      onChange={handleChange}
      validations={{
        ...props.validations,
        validate: customValidators(props.validations?.validate),
      }}
    />
  );

  function customValidators(
    validators?: RegisterOptions["validate"],
  ): RegisterOptions["validate"] {
    if (validators == null) {
      return getOverLimitMessage;
    } else if (typeof validators === "function") {
      return {
        customValidation: validators,
        getOverLimitMessage,
      };
    }

    return {
      ...validators,
      getOverLimitMessage,
    };
  }

  function handleChange(newValue: number) {
    props.onChange && props.onChange(newValue);
  }

  function getOverLimitMessage(
    value: InputNumberProps["value"],
  ): string | true {
    const isOverMax = props.max != undefined && value && value > props.max;
    const isUnderMin = props.min != undefined && value && value < props.min;

    if (isOverMax || isUnderMin || (value && value.toString() === "")) {
      if (props.min != undefined && props.max === undefined) {
        return `Enter a number that is greater than or equal to ${props.min}`;
      } else if (props.max != undefined && props.min === undefined) {
        return `Enter a number that is less than or equal to ${props.max}`;
      } else if (props.min != undefined && props.max != undefined) {
        return `Enter a number between ${props.min} and ${props.max}`;
      }
    }

    return true;
  }
}

export const InputNumber = forwardRef(InputNumberInternal);
