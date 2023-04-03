import React from "react";
// eslint-disable-next-line import/no-internal-modules
import supportsTime from "time-input-polyfill/supportsTime";
import { CivilTime } from "@std-proposal/temporal";
import { InputTimeSafari } from "./InputTimeSafari";
import {
  civilTimeToHTMLTime,
  htmlTimeToCivilTime,
} from "./civilTimeConversions";
import { InputTimeProps } from "./InputTimeProps";
import { FormField, FormFieldProps } from "../FormField";

export function InputTime<T extends CivilTime>({
  defaultValue,
  value,
  onChange,
  ...params
}: InputTimeProps<T>) {
  const handleChange = (newValue: string) => {
    onChange && onChange(htmlTimeToCivilTime<T>(newValue));
  };

  if (supportsTime) {
    const fieldProps: FormFieldProps = {
      onChange: handleChange,
      ...(defaultValue && { defaultValue: civilTimeToHTMLTime(defaultValue) }),
      ...(!defaultValue && { value: civilTimeToHTMLTime(value) }),
      ...params,
    };

    return <FormField type="time" {...fieldProps} />;
  } else {
    return (
      <InputTimeSafari
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        {...params}
      />
    );
  }
}
