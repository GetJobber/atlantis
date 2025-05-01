import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { InputMask } from "./InputMask";
import { InputPhoneNumberLegacyProps } from "./InputPhoneNumber.types";
import { FormField } from "../FormField";

export function InputPhoneNumber({
  required,
  ...props
}: InputPhoneNumberLegacyProps) {
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
        pattern={pattern}
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
