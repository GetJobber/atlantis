import React, { useLayoutEffect } from "react";
import TimePolyfill from "time-input-polyfill";
import debounce from "lodash/debounce";
import { InputTimeProps } from "./InputTimeProps";
import {
  atlantisTimeToHTMLTime,
  htmlTimeToAtlantisTime,
} from "./civilTimeConversions";
import { FormField } from "../FormField";

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
  const changeHandler = generateEventHandler(debouncedHandleChange);
  const blurHandler = generateEventHandler(handleChange);

  useLayoutEffect(() => {
    const input = inputTime.current as PolyfilledInputElement;

    new TimePolyfill(input);

    if (value) {
      input.value = atlantisTimeToHTMLTime(value);
      input.polyfill.update();
    }

    if (defaultValue) {
      input.value = atlantisTimeToHTMLTime(defaultValue);
      input.polyfill.update();
    }

    input.addEventListener("change", changeHandler);
    input.addEventListener("blur", blurHandler);

    return () => {
      window.removeEventListener("change", changeHandler);
      window.removeEventListener("blur", blurHandler);
    };
  }, []);

  useLayoutEffect(() => {
    const input = inputTime.current as PolyfilledInputElement;

    if (value) {
      input.value = atlantisTimeToHTMLTime(value);
      input.polyfill.update();
    }

    if (defaultValue) {
      input.value = atlantisTimeToHTMLTime(defaultValue);
      input.polyfill.update();
    }
  }, [value, defaultValue]);

  return <FormField inputRef={inputTime} type="time" {...params} />;

  function handleChange(newValue: string) {
    onChange && onChange(htmlTimeToAtlantisTime(newValue));
  }

  function generateEventHandler(handler: typeof handleChange) {
    return (event: Event) => {
      const newValue = (event.currentTarget as HTMLInputElement).dataset.value;

      if (newValue != undefined) {
        handler(newValue);
      }
    };
  }
}
