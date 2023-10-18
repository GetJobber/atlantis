/* eslint-disable max-statements */
import React, { useCallback, useRef, useState } from "react";
import { Popover } from "@jobber/components/Popover";
import classNames from "./InputDate.css";
import { Suffix } from "../FormField";
import { CalendarDatePicker } from "../CalandarDatePicker";
import { InputText, InputTextRef } from "../InputText";

type PropsOf<T> = T extends (props: infer P) => unknown ? P : never;

interface InputDateProps
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
   * Flag to indicate if the input should allow a range of dates.
   */
  readonly range?: boolean;
}

export function InputDate(props: InputDateProps) {
  const {
    value,
    date,
    showDatePicker,
    inputRef,
    onFocus,
    onBlur,
    onChangeInput,
    onSelectDate,
    onClickOutside,
    onToggleDatePicker,
  } = useInputDateCallbacks(props);

  const prefix = {
    icon: "calendar",
    ariaLabel: "Show calendar",
    onClick: onToggleDatePicker,
  } as Suffix;

  const suffix = props.clearable
    ? ({
        icon: "cross",
        ariaLabel: "Clear",
        onClick: () => {
          onChangeInput("");
          props.onChange(undefined);
        },
      } as Suffix)
    : undefined;

  return (
    <>
      <InputText
        {...props}
        ref={inputRef}
        suffix={suffix}
        prefix={prefix}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChangeInput}
      />
      <Popover
        attachTo={inputRef.current?.getInputRef}
        open={showDatePicker}
        dismissable={false}
        refocus={false}
      >
        <div className={classNames.picker}>
          <CalendarDatePicker
            onChange={onSelectDate}
            selected={date}
            onClickOutside={onClickOutside}
            minDate={props.minDate}
            maxDate={props.maxDate}
          />
        </div>
      </Popover>
    </>
  );
}

export const useBool = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);
  const toggle = useCallback(() => setState(current => !current), []);

  return [state, setTrue, setFalse, toggle] as const;
};

function isValidDate(date: Date | undefined) {
  return date instanceof Date && !isNaN(date.getTime());
}

function useInputDateCallbacks(props: InputDateProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<InputTextRef>(null);
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

  const onChangeInput = useCallback(
    (newValue: string) => {
      setValue(newValue);
      didChangeWhileFocused.current = true;
    },
    [props.onChange, hasFocus],
  );

  const onSelectDate = useCallback((newDate: Date | undefined) => {
    const isValid = isValidDate(newDate);
    setValue(isValid ? formatter.format(newDate) : "");
    props.onChange(isValid ? newDate : undefined);
  }, []);

  const onFocusInput = useCallback(() => {
    onFocus();
    props.onFocus?.();
    onShowDatePicker();
  }, [props.onFocus, onFocus, onShowDatePicker]);

  const onBlurInput = useCallback(() => {
    onBlur();
    props.onBlur?.();

    if (didChangeWhileFocused.current) {
      const dateFromValue = new Date(translateMonth(value));

      if (
        isValidDate(dateFromValue) &&
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
        setValue(isValidDate(date) ? formatter.format(date) : "");
      }
    }
    didChangeWhileFocused.current = false;
  }, [props.onBlur, onBlur, date, value]);

  const onClickOutside = useCallback(
    (event: MouseEvent) => {
      if (event.target !== inputRef.current?.getInputRef().current) {
        onHideDatePicker();
      }
    },
    [onHideDatePicker, inputRef.current?.getInputRef().current],
  );

  const onClear = useCallback(() => {
    onChangeInput("");
    props.onChange(undefined);
  }, [onChangeInput, props.onChange]);

  return {
    date,
    value,
    showDatePicker,
    inputRef,
    hasFocus,
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

function translateMonth(value: string) {
  if (/^en/.test(navigator.language)) return value;

  const localeFormatter = new Intl.DateTimeFormat(navigator.language, {
    month: "short",
  });

  const englishFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
  });

  const date = new Date(2000, 0, 1);

  return Array.from({ length: 12 }).reduce((acc: string, _, index) => {
    date.setMonth(index);

    return acc.replace(
      localeFormatter.format(date),
      englishFormatter.format(date),
    );
  }, value);
}
