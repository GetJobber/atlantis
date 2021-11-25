import React, { ReactElement, RefObject, useRef } from "react";
import classnames from "classnames";
import ReactDatePicker from "react-datepicker";
/**
 * Disabling no-internal-modules here because we need
 * to reach into the package to get the css file.
 */
// eslint-disable-next-line import/no-internal-modules
import "react-datepicker/dist/react-datepicker.css";
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
   * Stops the user from interaction
   */
  readonly disabled?: boolean;

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
   * Whether the datepicker should take up a whole block
   */
  readonly fullWidth?: boolean;
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
