import React, { ReactElement, useState } from "react";
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
import { XOR } from "ts-xor";
import styles from "./DatePicker.css";
import { strFormatDate } from "../FormatDate";
import { Button } from "../Button";
import { Heading } from "../Heading";

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
      calendarClassName={styles.datePicker}
      showPopperArrow={false}
      selected={startDate}
      inline={inline}
      onChange={handleChange}
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
        variation="subtle"
        type="tertiary"
      />

      <Heading level={3}>
        {monthDate.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        })}
      </Heading>

      <Button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        icon="arrowRight"
        ariaLabel="Next Month"
        variation="subtle"
        type="tertiary"
      />
    </div>
  );
}
