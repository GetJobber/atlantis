import React, { useLayoutEffect } from "react";
import TimePolyfill from "time-input-polyfill";
// eslint-disable-next-line import/no-internal-modules
import debounce from "lodash/debounce";
import { FormField } from "../FormField";
import { InputTimeProps } from "./InputTimeProps";
import {
  civilTimeToHTMLTime,
  htmlTimeToCivilTime,
} from "./civilTimeConversions";

interface PolyfilledInputElement extends HTMLInputElement {
  polyfill: { update: () => void };
}

export function InputTimeSafari({
  defaultValue,
  value,
  onChange,
  ...params
}: InputTimeProps) {
  const inputTime = React.createRef<HTMLInputElement>();
  const handleChange = (newValue: string) => {
    onChange && onChange(htmlTimeToCivilTime(newValue));
  };

  useLayoutEffect(() => {
    const input = inputTime.current as PolyfilledInputElement;
    const debouncedHandleChange = debounce(handleChange, 1000);

    const changeHandler = (event: Event) => {
      const value = (event.currentTarget as HTMLInputElement).dataset.value;

      if (value) {
        debouncedHandleChange(value);
      }
    };

    const blurHandler = (event: Event) => {
      const value = (event.currentTarget as HTMLInputElement).dataset.value;

      if (value) {
        handleChange(value);
      }
    };

    if (input) {
      new TimePolyfill(input);

      if (value) {
        input.value = civilTimeToHTMLTime(value);
        input.polyfill.update();
      }

      if (defaultValue) {
        input.value = civilTimeToHTMLTime(defaultValue);
        input.polyfill.update();
      }

      input.addEventListener("change", changeHandler);
      input.addEventListener("blur", blurHandler);
    }

    return () => {
      window.removeEventListener("change", changeHandler);
      window.removeEventListener("blur", blurHandler);
    };
  }, []);

  useLayoutEffect(() => {
    const input = inputTime.current as PolyfilledInputElement;

    if (input) {
      if (value) {
        input.value = civilTimeToHTMLTime(value);
        input.polyfill.update();
      }

      if (defaultValue) {
        input.value = civilTimeToHTMLTime(defaultValue);
        input.polyfill.update();
      }
    }
  }, [value, defaultValue]);

  return <FormField ref={inputTime} type="time" {...params} />;
}
