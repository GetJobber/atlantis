import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-internal-modules
import { InputTimeSafari } from "./InputTimeSafari";
import {
  civilTimeToHTMLTime,
  htmlTimeToCivilTime,
} from "./civilTimeConversions";
import { InputTimeProps } from "./InputTimeProps";
import { FormField, FormFieldProps } from "../FormField";

export function InternalInputTime({
  defaultValue,
  value,
  onChange,
  ...params
}: InputTimeProps) {
  const [supportsTime, setSupportsTime] = useState(false);

  const handleChange = (newValue: string) => {
    onChange && onChange(htmlTimeToCivilTime(newValue));
  };
  useEffect(() => {
    const getTime = async () => {
      const { supportsTime: externalSupportsTime } = await import(
        "./SupportsTimePolyfill"
      );
      setSupportsTime(externalSupportsTime as unknown as boolean);
    };
    getTime();
  }, []);

  if (supportsTime) {
    const fieldProps: FormFieldProps = {
      onChange: onChange && handleChange,
      ...(defaultValue && { defaultValue: civilTimeToHTMLTime(defaultValue) }),
      ...(!defaultValue && onChange && { value: civilTimeToHTMLTime(value) }),
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
