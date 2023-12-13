import React from "react";
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
    const setupTimePolyfill = async () => {
      const input = inputTime.current as PolyfilledInputElement;
      const { TimePolyfill } = await import("./TimeInputPolyfill.client");
      new TimePolyfill(input);

      if (value && input.polyfill) {
        input.value = civilTimeToHTMLTime(value);
        input.polyfill?.update();
      }

      if (defaultValue && input.polyfill) {
        input.value = civilTimeToHTMLTime(defaultValue);
        input.polyfill?.update();
      }

      input.addEventListener("change", changeHandler);
      input.addEventListener("blur", blurHandler);
    };
    setupTimePolyfill();

    return () => {
      window.removeEventListener("change", changeHandler);
      window.removeEventListener("blur", blurHandler);
    };
  }, [(inputTime.current as PolyfilledInputElement)?.polyfill]);

  useSafeLayoutEffect(() => {
    const input = inputTime.current as PolyfilledInputElement;

    if (value && input.polyfill) {
      input.value = civilTimeToHTMLTime(value);
      input.polyfill.update();
    }

    if (defaultValue && input.polyfill) {
      input.value = civilTimeToHTMLTime(defaultValue);
      input.polyfill.update();
    }
  }, [
    value,
    defaultValue,
    (inputTime.current as PolyfilledInputElement)?.polyfill,
  ]);

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
