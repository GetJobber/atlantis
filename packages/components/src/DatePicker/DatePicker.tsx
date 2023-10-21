import React, { ReactElement, useEffect, useRef, useState } from "react";
import { XOR } from "ts-xor";
import styles from "./DatePicker.css";
import {
  DatePickerActivator,
  DatePickerActivatorProps,
} from "./DatePickerActivator";
import { Popover } from "../Popover";
import { CalendarDatePicker } from "../CalendarDatePicker";

interface BaseDatePickerProps {
  /**
   * The maximum selectable date.
   */
  readonly maxDate?: Date;

  /**
   * The minimum selectable date.
   */
  readonly minDate?: Date;

  /**
   * The selected Date object
   */
  readonly selected?: Date;

  /**
   * Determines if the focus moves to the selected date (if any) or back to
   * the activator
   */
  readonly smartAutofocus?: boolean;

  /**
   * Dates on the calendar to highlight
   */
  readonly highlightDates?: Date[];

  /**
   * Change handler that will return the date selected.
   */
  onChange(val: Date | undefined): void;

  /**
   * Change handler when the selected month changes
   */
  onMonthChange?(val: Date): void;
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
  /**
   * Determines if the DatePicker should be shown without needing to trigger the Activator.
   */
  readonly inline?: boolean;
}

type DatePickerProps = XOR<DatePickerModalProps, DatePickerInlineProps>;

export function DatePicker({ inline, ...props }: DatePickerProps) {
  if (inline) {
    return <InlineDatePicker {...props} />;
  } else {
    return <DatePickerWithActivator {...props} />;
  }
}

function InlineDatePicker({
  onChange,
  onMonthChange,
  selected,
  readonly = false,
  maxDate,
  minDate,
  highlightDates,
}: DatePickerProps) {
  return (
    <CalendarDatePicker
      onChange={readonly ? () => undefined : onChange}
      selected={selected}
      minDate={minDate}
      maxDate={maxDate}
      highlightedDates={highlightDates}
      onMonthChange={onMonthChange}
      focusonSelectedDate
    />
  );
}

function DatePickerWithActivator({
  onChange,
  onMonthChange,
  activator,
  selected,
  readonly = false,
  disabled = false,
  fullWidth = false,
  smartAutofocus = true,
  maxDate,
  minDate,
  highlightDates,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEscapeKeyToCloseDatePicker(open, handleCalendarClose, ref);

  const onChangeHandler = (
    date: Date | undefined,
    method: "click" | "enter" | "space",
  ) => {
    onChange(date);

    if (method === "enter") handleCalendarClose();
  };

  return (
    <div className={styles.datePickerWrapper} ref={ref}>
      <DatePickerActivator
        activator={activator}
        fullWidth={fullWidth}
        disabled={disabled}
        onClick={toggleCalendar}
      />
      <Popover
        attachTo={ref}
        open={open}
        refocus={smartAutofocus}
        dismissable={false}
      >
        <CalendarDatePicker
          onChange={readonly ? () => undefined : onChangeHandler}
          selected={selected}
          minDate={minDate}
          maxDate={maxDate}
          highlightedDates={highlightDates}
          onMonthChange={onMonthChange}
          onClickOutside={handleCalendarClose}
          focusonSelectedDate
        />
      </Popover>
    </div>
  );

  function handleCalendarClose() {
    setOpen(false);
  }

  function toggleCalendar() {
    setOpen(!open);
  }
}

function useEscapeKeyToCloseDatePicker(
  open: boolean,
  onClose: () => void,
  ref: React.RefObject<HTMLDivElement>,
) {
  const escFunction = (event: KeyboardEvent) => {
    if (event.key === "Escape" && open) {
      // Close the picker ourselves and prevent propagation so that ESC presses with the picker open
      // do not close parent elements that may also be listening for ESC presses such as Modals
      onClose();
      event.stopPropagation();
    }
  };
  useEffect(() => {
    ref.current?.addEventListener("keydown", escFunction);

    return () => {
      ref.current?.removeEventListener("keydown", escFunction);
    };
  }, [open, ref]);
}
