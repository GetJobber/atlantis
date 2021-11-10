import React, { ReactElement, useState } from "react";
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
import { strFormatDate } from "../FormatDate";
import { Button } from "../Button";

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

  const datePickerClassNames = classnames(styles.datePicker, {
    [styles.inline]: inline,
  });

  return (
    <div>
      <ReactDatePicker
        calendarClassName={datePickerClassNames}
        showPopperArrow={false}
        selected={startDate}
        inline={inline}
        onChange={handleChange}
        formatWeekDay={date => date.substr(0, 3)}
        customInput={
          activator ? (
            activator
          ) : (
            <Button icon="calendar" ariaLabel="Open Datepicker" />
          )
        }
        renderCustomHeader={props => <DatePickerCustomHeader {...props} />}
      />
    </div>
  );

  function handleChange(val: Date) {
    setStartDate(val);
    onChange && onChange({ formatted: strFormatDate(val), raw: val });
  }
}
