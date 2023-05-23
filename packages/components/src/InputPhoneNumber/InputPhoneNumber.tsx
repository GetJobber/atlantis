import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { InputMask, InputMaskProps } from "./InputMask";
import { CommonFormFieldProps, FormField, FormFieldProps } from "../FormField";

interface InputPhoneNumberProps
  extends Omit<CommonFormFieldProps, "align">,
    Pick<
      FormFieldProps,
      | "autocomplete"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "validations"
      | "readonly"
      | "prefix"
      | "suffix"
    > {
  readonly value: string;
  readonly onChange: (value: string) => void;

  /**
   * A pattern to specify the format to display the phone number in.
   * For example if you want to display the format for [Denmark](https://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers#Denmark)
   * you could set it to `** ** ** **`
   * @default "(***) ***-****"
   */
  readonly pattern?: InputMaskProps["pattern"];

  /**
   * Shows a "required" validation message when the component is left empty.
   */
  readonly required?: boolean;
}

export function InputPhoneNumber({
  required,
  ...props
}: InputPhoneNumberProps) {
  const { placeholder, validations, pattern = "(***) ***-****" } = props;
  const errorSubject = placeholder || "Phone number";
  const { getValues } =
    useFormContext() != undefined
      ? useFormContext()
      : // If there isn't a Form Context being provided, get a form for this field.
        useForm({ mode: "onTouched" });

  return (
    <InputMask pattern={pattern} strict={false}>
      <FormField
        {...props}
        type="tel"
        validations={{
          required: {
            value: Boolean(required),
            message: `${errorSubject} is required`,
          },
          ...validations,
          validate: getPhoneNumberValidation,
        }}
      />
    </InputMask>
  );

  function getPhoneNumberValidation(value: string) {
    // Get unique characters that aren't * in the pattern
    const patternNonDelimterCharacters = pattern
      .split("")
      .filter(char => char !== "*")
      .filter((char, index, arr) => arr.indexOf(char) === index);
    const specialCharacters = patternNonDelimterCharacters.join(" ");
    // Remove special characters from pattern
    const cleanValue = value.replace(
      new RegExp(`[${specialCharacters}]`, "g"),
      "",
    );
    const cleanValueRequiredLength = (pattern.match(/\*/g) || []).length;
    if (cleanValue.length > 0 && cleanValue.length < cleanValueRequiredLength) {
      return `${errorSubject} must contain ${cleanValueRequiredLength} or more digits`;
    }

    if (typeof validations?.validate === "function") {
      return validations.validate(value, getValues);
    }

    return true;
  }
}
