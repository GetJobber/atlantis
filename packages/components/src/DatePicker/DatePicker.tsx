import React, { ReactElement, useState } from "react";
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
/**
 * Disabling no-internal-modules here because we need
 * to reach into the package to get the css file.
 */
// eslint-disable-next-line import/no-internal-modules
import "react-datepicker/dist/react-datepicker.css";
import { XOR } from "ts-xor";
import styles from "./DatePicker.css";
import { strFormatDate } from "../FormatDate";
import { Button } from "../Button";
import { Typography } from "../Typography";

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
      calendarClassName={styles.datePicker}
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
  );

  function handleChange(val: Date) {
    setStartDate(val);
    onChange && onChange({ formatted: strFormatDate(val), raw: val });
  }
}

function DatePickerCustomHeader({
  monthDate,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) {
  return (
    <div className={styles.header}>
      <Button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        icon="arrowLeft"
        ariaLabel="Previous Month"
        variation="work"
        type="tertiary"
      />

      <div className={styles.month}>
        <Typography
          element="span"
          fontFamily="display"
          size="large"
          textCase="uppercase"
        >
          {monthDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
      </div>

      <Button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        icon="arrowRight"
        ariaLabel="Next Month"
        variation="work"
        type="tertiary"
      />
    </div>
  );
}
