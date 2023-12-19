import React, { useEffect } from "react";
// eslint-disable-next-line import/no-internal-modules
import supportsTime from "time-input-polyfill/supportsTime";
import debounce from "lodash/debounce";
import { InputTimeSafari } from "./InputTimeSafari";
import {
  civilTimeToHTMLTime,
  htmlTimeToCivilTime,
} from "./civilTimeConversions";
import { InputTimeProps } from "./InputTimeProps";
import { FormField, FormFieldProps } from "../FormField";

const hour12to24Hours: Record<string, number | undefined> = {
  "1": 13,
  "2": 14,
  "3": 15,
  "4": 16,
  "5": 17,
  "6": 18,
  "7": 19,
  "8": 20,
};

export function InputTime({
  defaultValue,
  value,
  onChange,
  ...params
}: InputTimeProps) {
  const [typedTime, setTypedTime] = React.useState<string>("");

  const handleChange = (newValue: string) => {
    onChange && onChange(htmlTimeToCivilTime(newValue));
    setTypedTime("");
  };

  if (supportsTime) {
    const fieldProps: FormFieldProps = {
      onChange: handleChange,
      ...(defaultValue && { defaultValue: civilTimeToHTMLTime(defaultValue) }),
      ...(!defaultValue && { value: civilTimeToHTMLTime(value) }),
      ...params,
    };

    const handleKeyup = debounce(() => {
      if (value) {
        return;
      }

      const today = new Date();
      const currentHour = today.getHours();
      let predictedHour: number;

      if (typedTime === "1") {
        predictedHour = currentHour + 1;
      } else {
        predictedHour =
          hour12to24Hours[parseInt(typedTime, 10)] || parseInt(typedTime, 10);
      }

      console.log(typedTime);

      handleChange(`${predictedHour}:00`);
    }, 300);

    useEffect(() => {
      handleKeyup();

      return handleKeyup.cancel;
    }, [typedTime]);

    return (
      <FormField
        type="time"
        {...fieldProps}
        onKeyUp={e => {
          setTypedTime(prev => prev + e.key);
        }}
      />
    );
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
