import React from "react";
// eslint-disable-next-line import/no-internal-modules
import supportsTime from "time-input-polyfill/supportsTime";
import { FormField, FormFieldProps } from "../FormField";
import { InputTimeSafari } from "./InputTimeSafari";
import {
  civilTimeToHTMLTime,
  htmlTimeToCivilTime,
} from "./civilTimeConversions";
import { InputTimeProps } from "./InputTimeProps";

export function InputTime({
  defaultValue,
  value,
  onChange,
  ...params
}: InputTimeProps) {
  const handleChange = (newValue: string) => {
    if (newValue === "") {
      return;
    }

    onChange && onChange(htmlTimeToCivilTime(newValue));
  };

  const formFieldValue = value ? civilTimeToHTMLTime(value) : undefined;

  if (supportsTime) {
    const fieldProps: FormFieldProps = {
      onChange: handleChange,
      ...(value == undefined &&
        defaultValue != undefined && {
          defaultValue: civilTimeToHTMLTime(defaultValue),
        }),
      ...(value && { value: formFieldValue }),
      ...params,
    };

    return <FormField type="time" {...fieldProps} />;
  } else {
    return (
      <InputTimeSafari
        defaultValue={
          value == undefined && defaultValue != undefined
            ? defaultValue
            : undefined
        }
        value={value}
        onChange={onChange}
        {...params}
      />
    );
  }
}
