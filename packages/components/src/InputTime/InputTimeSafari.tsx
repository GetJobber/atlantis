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
  const debouncedHandleChange = debounce(handleChange, 1000);

  useLayoutEffect(() => {
    const input = inputTime.current as PolyfilledInputElement;

    const changeHandler = generateEventHandler(debouncedHandleChange);
    const blurHandler = generateEventHandler(handleChange);

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

  function generateEventHandler(handler: typeof handleChange) {
    return (event: Event) => {
      if (handler !== debouncedHandleChange) {
        debouncedHandleChange.cancel();
      }

      const input = event.currentTarget as PolyfilledInputElement;
      const newValue = input.dataset.value;

      if (newValue && newValue !== "") {
        handler(newValue);
        return;
      }

      if (value) {
        input.value = civilTimeToHTMLTime(value || "");
        input.polyfill.update();
        handler(civilTimeToHTMLTime(value));
        return;
      }
    };
  }

  function handleChange(newValue: string) {
    onChange && onChange(htmlTimeToCivilTime(newValue) || value);
  }
}
