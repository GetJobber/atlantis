import React from "react";
import TimePolyfill from "time-input-polyfill";
import debounce from "lodash/debounce";
import { InputTimeProps } from "./InputTimeProps";
import {
  civilTimeToHTMLTime,
  htmlTimeToCivilTime,
} from "./civilTimeConversions";
import { FormField } from "../FormField";
import { useSafeLayoutEffect } from "../InputText/useSafeLayoutEffect";

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

  useSafeLayoutEffect(() => {
    const input = inputTime.current as PolyfilledInputElement;

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

    return () => {
      window.removeEventListener("change", changeHandler);
      window.removeEventListener("blur", blurHandler);
    };
  }, []);

  useSafeLayoutEffect(() => {
    const input = inputTime.current as PolyfilledInputElement;

    if (value) {
      input.value = civilTimeToHTMLTime(value);
      input.polyfill.update();
    }

    if (defaultValue) {
      input.value = civilTimeToHTMLTime(defaultValue);
      input.polyfill.update();
    }
  }, [value, defaultValue]);

  return <FormField inputRef={inputTime} type="time" {...params} />;

  function handleChange(newValue: string) {
    onChange && onChange(htmlTimeToCivilTime(newValue));
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
