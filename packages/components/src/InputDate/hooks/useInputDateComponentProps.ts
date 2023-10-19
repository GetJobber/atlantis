import { useCallback, useRef, useState } from "react";
import { Suffix } from "@jobber/components/FormField";
import { InputText } from "@jobber/components/InputText";
import { useBool } from "./useBool";
import { useEscapeKeyToCloseDatePicker } from "./useEscapeKeyToCloseDatePicker";
import { isValidDate } from "../utils/isValidDate";
import { translateMonth } from "../utils/translateMonth";

type PropsOf<T> = T extends (props: infer P) => unknown ? P : never;

export interface InputDateProps
  extends Omit<
    PropsOf<typeof InputText>,
    | "value"
    | "onChange"
    | "suffix"
    | "prefix"
    | "multiline"
    | "rows"
    | "maxLength"
  > {
  /**
   * A Date object value
   * (e.g., `new Date("11/11/2011")`)
   * */
  readonly value?: Date;
  /**
   * Flag to indicate if the input should be clearable.
   */
  readonly clearable?: boolean;
  /**
   * Callback executed when the user changes the input value.
   */
  onChange(newValue: Date | undefined): void;
  /**
   * The maximum selectable date.
   */
  readonly maxDate?: Date;

  /**
   * The minimum selectable date.
   */
  readonly minDate?: Date;

  /**
   * A list of dates to highlight on the calendar.
   */
  readonly highlightedDates?: Date[];
}

/* eslint-disable max-statements */
export function useInputDateComponentProps(props: InputDateProps) {
  const [value, setValue] = useState("");
  const formFieldRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [hasFocus, onFocus, onBlur] = useBool();
  const didChangeWhileFocused = useRef(false);
  const date = isValidDate(props.value) ? props.value : undefined;
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "medium",
  });

  const [
    showDatePicker,
    onShowDatePicker,
    onHideDatePicker,
    onToggleDatePicker,
  ] = useBool();

  /**
   * Callback executed when the user changes the input value manually.
   */
  const onChangeInput = useCallback(
    (newValue: string) => {
      setValue(newValue);
      didChangeWhileFocused.current = true;
    },
    [props.onChange, hasFocus],
  );

  /**
   * Callback passed to the date picker to be executed when the user selects a date.
   */
  const onSelectDate = useCallback((newDate: Date | undefined) => {
    const isValid = isValidDate(newDate);
    setValue(isValid ? formatter.format(newDate) : "");
    props.onChange(isValid ? newDate : undefined);
  }, []);

  /**
   * Callback executed when the input receives focus.
   */
  const onFocusInput = useCallback(() => {
    // Set hasFocus to true
    onFocus();
    // Call potentail onFocus callback passed as prop
    props.onFocus?.();
    // Open the date picker
    onShowDatePicker();
  }, [props.onFocus, onFocus, onShowDatePicker]);

  /**
   * Callback executed when the input loses focus.
   */
  const onBlurInput = useCallback(() => {
    // Set hasFocus to false
    onBlur();
    // Call potentail onBlur callback passed as prop
    props.onBlur?.();

    // Attempt to parse the provided value as a date if
    // the input value was updated by typing
    // and execute the onChange callback if the date is valid
    if (didChangeWhileFocused.current) {
      const dateFromValue = new Date(translateMonth(value));

      if (
        isValidDate(dateFromValue) &&
        // Typed date is within the min and max dates
        (props.minDate
          ? dateFromValue.getTime() > props.minDate.getTime()
          : true) &&
        (props.maxDate
          ? dateFromValue.getTime() < props.maxDate.getTime()
          : true)
      ) {
        props.onChange(dateFromValue);
        setValue(formatter.format(dateFromValue));
      } else {
        // Revert the input value if the date is invalid
        setValue(isValidDate(date) ? formatter.format(date) : "");
      }
    }
    didChangeWhileFocused.current = false;
  }, [props.onBlur, onBlur, date, value]);

  const onClickOutside = useCallback(
    (event: MouseEvent) => {
      const el = formFieldRef.current;
      // If the click is inside the form field, do nothing
      if (!el || !event.target || el.contains(event.target as Node)) return;

      onHideDatePicker();
    },
    [onHideDatePicker, formFieldRef.current],
  );

  /**
   * Callback executed when the user clicks the clear button.
   */
  const onClear = useCallback(() => {
    onChangeInput("");
    props.onChange(undefined);
  }, [onChangeInput, props.onChange]);

  const prefix = {
    icon: "calendar",
    ariaLabel: "Show calendar",
    onClick: onToggleDatePicker,
  } as Suffix;

  const suffix = props.clearable
    ? ({
        icon: "cross",
        ariaLabel: "Clear",
        onClick: onClear,
      } as Suffix)
    : undefined;

  useEscapeKeyToCloseDatePicker(showDatePicker, onHideDatePicker, [
    formFieldRef,
    pickerRef,
  ]);

  return {
    date,
    value,
    showDatePicker,
    formFieldRef,
    pickerRef,
    hasFocus,
    prefix,
    suffix,
    onFocus: onFocusInput,
    onBlur: onBlurInput,
    onChangeInput,
    onSelectDate,
    onShowDatePicker,
    onHideDatePicker,
    onToggleDatePicker,
    onClickOutside,
    onClear,
  };
}

export type InputDateComponentProps = ReturnType<
  typeof useInputDateComponentProps
>;
