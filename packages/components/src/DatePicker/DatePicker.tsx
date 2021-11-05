import React, { ReactElement, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { XOR } from "ts-xor";
import styles from "./DatePicker.css";
import { strFormatDate } from "../FormatDate";
import { Button } from "../Button";

/**
 * Disabling no-internal-modules here because we need
 * to reach into the package to get the css file.
 */
// eslint-disable-next-line import/no-internal-modules
import "react-datepicker/dist/react-datepicker.css";

export interface DatePickerReturnedDates {
  readonly formatted: string;
  readonly raw: Date;
}

interface BaseDatePickerProps {
  /**
   * Change handler that will return the date selected.
   */
  onChange(val: DatePickerReturnedDates): void;
}

interface DatePickerModalProps extends BaseDatePickerProps {
  /**
   * Use a custom activator to trigger the DatePicker
   */
  readonly activator?: ReactElement;
}

interface DatePickerInlineProps extends BaseDatePickerProps {
  readonly inline?: boolean;
}

type DatePickerProps = XOR<DatePickerModalProps, DatePickerInlineProps>;

export function DatePicker({ onChange, activator, inline }: DatePickerProps) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <ReactDatePicker
      showPopperArrow={false}
      selected={startDate}
      className={styles.datePicker}
      inline={inline}
      onChange={handleChange}
      customInput={
        activator ? (
          activator
        ) : (
          <Button icon="calendar" ariaLabel="Open Datepicker" />
        )
      }
    />
  );

  function handleChange(val: Date) {
    setStartDate(val);
    onChange && onChange({ formatted: strFormatDate(val), raw: val });
  }
}
