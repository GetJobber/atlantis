import React, { ReactElement, RefObject, useRef } from "react";
import classnames from "classnames";
import ReactDatePicker from "react-datepicker";
import { XOR } from "ts-xor";
import styles from "./DatePicker.css";
import { DatePickerCustomHeader } from "./DatePickerCustomHeader";
import {
  DatePickerActivator,
  DatePickerActivatorProps,
} from "./DatePickerActivator";

interface BaseDatePickerProps {
  /**
   * The selected Date object
   */
  readonly selected?: Date;

  /**
   * Change handler that will return the date selected.
   */
  onChange(val: Date): void;
}

interface DatePickerModalProps extends BaseDatePickerProps {
  /**
   * Use a custom activator to trigger the DatePicker
   */
  readonly activator?:
    | ReactElement
    | ((props: DatePickerActivatorProps) => ReactElement);

  /**
   * Stops the user from interaction
   */
  readonly disabled?: boolean;

  /**
   * Whether the datepicker should take up a whole block
   */
  readonly fullWidth?: boolean;

  /**
   * Whether or not you can select a date
   */
  readonly readonly?: boolean;
}

interface DatePickerInlineProps extends BaseDatePickerProps {
  readonly inline?: boolean;
}

type DatePickerProps = XOR<DatePickerModalProps, DatePickerInlineProps>;

export function DatePicker({
  onChange,
  activator,
  inline,
  selected,
  readonly = false,
  disabled = false,
  fullWidth = false,
}: DatePickerProps) {
  const datePickerClassNames = classnames(styles.datePicker, {
    [styles.inline]: inline,
  });
  const wrapperClassName = classnames(styles.datePickerWrapper, {
    [styles.fullWidth]: fullWidth,
  });

  const datePickerRef = useRef() as RefObject<HTMLDivElement>;

  return (
    <div className={wrapperClassName} ref={datePickerRef}>
      <ReactDatePicker
        calendarClassName={datePickerClassNames}
        showPopperArrow={false}
        selected={selected}
        inline={inline}
        disabled={disabled}
        readOnly={readonly}
        onChange={handleChange}
        formatWeekDay={date => date.substr(0, 3)}
        customInput={
          <DatePickerActivator activator={activator} fullWidth={fullWidth} />
        }
        renderCustomHeader={props => <DatePickerCustomHeader {...props} />}
      />
    </div>
  );

  function handleChange(value: Date) {
    onChange(value);
  }
}
