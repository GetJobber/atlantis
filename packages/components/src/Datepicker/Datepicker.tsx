import React, { ReactElement, cloneElement, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { XOR } from "ts-xor";
import { Button } from "../Button";
import { strFormatDate } from "../FormatDate";

/**
 * Disabling no-internal-modules here because we need
 * to reach into the package to get the css file.
 */
// eslint-disable-next-line import/no-internal-modules
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerReturnedDates {
  readonly formatted: string;
  readonly raw: Date;
}

interface DatePickerBaseProps {
  /**
   * Change handler. Will return a date string in the prefered format
   */
  onChange(val: DatePickerReturnedDates): void;
}

interface DatePickerModalProps extends DatePickerBaseProps {
  /**
   * Display the Datepicker inline instead of in a modal style
   */
  readonly activator?: ReactElement;
}

interface DatePickerInlineProps extends DatePickerBaseProps {
  /**
   * Display the Datepicker inline instead of in a modal style
   */
  readonly inline: boolean;
}

type DatePickerProps = XOR<DatePickerInlineProps, DatePickerModalProps>;

export function Datepicker({ activator, onChange, inline }: DatePickerProps) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <ReactDatePicker
      selected={startDate}
      onChange={handleChange}
      inline={inline}
      customInput={
        activator ? (
          cloneElement(activator)
        ) : (
          <Button icon="calendar" ariaLabel="DatePicker" />
        )
      }
    />
  );

  function handleChange(val: Date) {
    setStartDate(val);
    onChange && onChange({ raw: val, formatted: strFormatDate(val) });
  }
}
