import React, { ReactElement, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import ReactDatePicker from "react-datepicker";
import { XOR } from "ts-xor";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import styles from "./DatePicker.css";
import { DatePickerCustomHeader } from "./DatePickerCustomHeader";
import {
  DatePickerActivator,
  DatePickerActivatorProps,
} from "./DatePickerActivator";
import { useFocusOnSelectedDate } from "./useFocusOnSelectedDate";

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
  onChange(val: Date): void;

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

export function DatePicker({
  onChange,
  onMonthChange,
  activator,
  inline,
  selected,
  readonly = false,
  disabled = false,
  fullWidth = false,
  smartAutofocus = true,
  maxDate,
  minDate,
  highlightDates,
}: DatePickerProps) {
  const { ref, focusOnSelectedDate } = useFocusOnSelectedDate();
  const [open, setOpen] = useState(false);
  const { datePickerRef } = useDatePickerFocus(ref, open, inline);
  const wrapperClassName = classnames(styles.datePickerWrapper, {
    // react-datepicker uses this class name to not close the date picker when
    // the activator is clicked
    // https://github.com/Hacker0x01/react-datepicker/blob/master/src/index.jsx#L905
    //
    // It uses react-onclickoutside package and declaring some elements to be
    // ignored via said class name
    // https://www.npmjs.com/package/react-onclickoutside#marking-elements-as-skip-over-this-one-during-the-event-loop
    "react-datepicker-ignore-onclickoutside": !inline,
    [styles.fullWidth]: fullWidth,
  });
  const datePickerClassNames = classnames(styles.datePicker, {
    [styles.inline]: inline,
  });

  if (smartAutofocus) {
    useRefocusOnActivator(open);
    useEffect(focusOnSelectedDate, [open]);
  }

  return (
    <div className={wrapperClassName} ref={ref}>
      <ReactDatePicker
        calendarClassName={datePickerClassNames}
        showPopperArrow={false}
        selected={selected}
        inline={inline}
        disabled={disabled}
        readOnly={readonly}
        enableTabLoop={false}
        onChange={handleChange}
        maxDate={maxDate}
        minDate={minDate}
        ref={datePickerRef}
        useWeekdaysShort={true}
        customInput={
          <DatePickerActivator activator={activator} fullWidth={fullWidth} />
        }
        renderCustomHeader={props => <DatePickerCustomHeader {...props} />}
        onCalendarOpen={handleCalendarOpen}
        onCalendarClose={handleCalendarClose}
        dateFormat={["P", "PP", "PPP", "MMM dd yyyy", "MMMM dd yyyy"]}
        highlightDates={highlightDates}
        onMonthChange={onMonthChange}
      />
    </div>
  );

  /**
   * The onChange callback on ReactDatePicker returns a Date and an Event, but
   * the onChange in our interface only provides the Date. Simplifying the code
   * by removing this function and passing it directly to the underlying
   * component breaks tests both here and downstream (i.e. the pattern
   * `expect(onChange).toHaveBeenCalledWith(date)` is commonly used and would
   * fail).
   */
  function handleChange(value: Date /* , event: React.SyntheticEvent */) {
    onChange(value);
  }

  function handleCalendarOpen() {
    setOpen(true);
  }

  function handleCalendarClose() {
    setOpen(false);
  }
}

function useDatePickerFocus(
  ref: React.RefObject<HTMLDivElement>,
  open: boolean,
  inline: boolean | undefined,
): {
  datePickerRef: React.RefObject<ReactDatePicker>;
} {
  const datePickerRef = useRef<ReactDatePicker>(null);

  const handleTabbing = (event: KeyboardEvent) => {
    setTimeout(() => {
      if (
        event.key === "Tab" &&
        ref.current &&
        !ref.current.contains(document.activeElement)
      ) {
        datePickerRef.current?.setOpen(false);
      }
    }, 0);
  };

  useEffect(() => {
    if (!inline && open) {
      ref.current?.addEventListener("keydown", handleTabbing);
    }
    return () => {
      ref.current?.removeEventListener("keydown", handleTabbing);
    };
  }, [open, ref, inline, handleTabbing]);

  return {
    datePickerRef,
  };
}
