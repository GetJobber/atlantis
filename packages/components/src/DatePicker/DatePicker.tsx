import React, { ReactElement, RefObject, useRef, useState } from "react";
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

  const datePickerRef = useRef() as RefObject<HTMLDivElement>;

  return (
    <div className={styles.datePickerWrapper} ref={datePickerRef}>
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
            <Button
              variation="work"
              type="tertiary"
              icon="calendar"
              ariaLabel="Open Datepicker"
            />
          )
        }
        renderCustomHeader={props => <DatePickerCustomHeader {...props} />}
        onCalendarOpen={focusSelectedDate}
      />
    </div>
  );

  function handleChange(val: Date) {
    setStartDate(val);
    onChange && onChange({ formatted: strFormatDate(val), raw: val });
  }

  function focusSelectedDate() {
    const selectedDateClass = ".react-datepicker__day--selected";

    const selectedDate =
      datePickerRef.current?.querySelector(selectedDateClass);

    if (selectedDate instanceof HTMLDivElement) {
      selectedDate.focus();
    }
  }
}
