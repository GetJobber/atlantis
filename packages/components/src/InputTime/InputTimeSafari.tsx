import React, { useLayoutEffect } from "react";
import { CivilTime } from "@std-proposal/temporal";
// eslint-disable-next-line import/no-internal-modules
import supportsTime from "time-input-polyfill/supportsTime";
import TimePolyfill from "time-input-polyfill";
// eslint-disable-next-line import/no-internal-modules
import debounce from "lodash/debounce";
import { FormField, FormFieldProps } from "../FormField";

/**
 * The following is the same as:
 *   type BaseProps = Omit<FormFieldProps, "type" | "children">;
 * Unfortunately Docz doesn't currently support Omit so it has been reduced to
 * its component parts.
 */
type BaseProps = Pick<
  FormFieldProps,
  Exclude<
    keyof FormFieldProps,
    "type" | "children" | "rows" | "defaultValue" | "value" | "onChange"
  >
>;

interface InputTimeSafariProps extends BaseProps {
  /**
   * Intial value of the input. Only use this when you need to prepopulate the
   * field with a data that is not controlled by the components state. If a
   * state is controlling the value, use the `value` prop instead.
   */
  readonly defaultValue?: CivilTime;

  /**
   * Set the component to the given value.
   */
  readonly value?: CivilTime;

  /**
   * Function called when user changes input value.
   */
  onChange?(newValue: CivilTime): void;
}

export function InputTimeSafari({
  defaultValue,
  value,
  onChange,
  ...params
}: InputTimeSafariProps) {
  const inputTime = React.createRef<HTMLInputElement>();
  const handleChange = (newValue: string) => {
    onChange && onChange(htmlTimeToCivilTime(newValue));
  };

  if (supportsTime) {
    const fieldProps: FormFieldProps = {
      onChange: handleChange,
      defaultValue:
        defaultValue != undefined
          ? civilTimeToHTMLTime(defaultValue)
          : undefined,
      value: value != undefined ? civilTimeToHTMLTime(value) : undefined,
      ...params,
    };

    return <FormField ref={inputTime} type="time" {...fieldProps} />;
  } else {
    interface PolyfilledInputElement extends HTMLInputElement {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      polyfill: any;
    }

    useLayoutEffect(() => {
      const input = inputTime.current as PolyfilledInputElement;
      const debouncedHandleChange = debounce(handleChange, 1000);

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

        // TODO: Remember to unmount this.
        input.addEventListener("change", (event: Event) => {
          const value = (event.currentTarget as HTMLInputElement).dataset.value;

          if (value) {
            debouncedHandleChange(value);
          }
        });

        input.addEventListener("blur", (event: Event) => {
          const value = (event.currentTarget as HTMLInputElement).dataset.value;

          if (value) {
            handleChange(value);
          }
        });
      }
    }, []);

    // TODO: Handle Value change
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

    return <FormField ref={inputTime} type="time" />;
  }
}

function civilTimeToHTMLTime(civilTime: CivilTime): string {
  const timeString = civilTime.toString();
  return timeString.substring(0, timeString.indexOf("."));
}

function htmlTimeToCivilTime(timeString: string): CivilTime {
  return CivilTime.fromString(timeString + ":00.000000000");
}
