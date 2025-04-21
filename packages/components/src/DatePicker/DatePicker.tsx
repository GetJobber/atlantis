import React, { ReactElement, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { XOR } from "ts-xor";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import * as locales from "date-fns/locale";
import styles from "./DatePicker.module.css";
import { DatePickerCustomHeader } from "./DatePickerCustomHeader";
import {
  DatePickerActivator,
  DatePickerActivatorProps,
} from "./DatePickerActivator";
import { useFocusOnSelectedDate } from "./useFocusOnSelectedDate";
import { useAtlantisContext } from "../AtlantisContext";

// Register date-fns locales with react-datepicker
// This is required for the DatePicker to support different locales via props or AtlantisContext
Object.entries(locales).forEach(([key, value]) => {
  if (key !== "default" && !key.startsWith("_")) {
    registerLocale(key, value);
  }
});

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
   * Change the locale for the calendar's language and formatting.
   *
   * Regional settings can be implemented either through AtlantisContext
   * or by using this prop, which will override the context value.
   */
  readonly locale?: string;

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

/*eslint max-statements: ["error", 14]*/
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
  locale: localeProp,
}: DatePickerProps) {
  const { ref, focusOnSelectedDate } = useFocusOnSelectedDate();
  const [open, setOpen] = useState(false);
  const { dateFormat, locale: contextLocale } = useAtlantisContext();
  const effectiveLocale = localeProp || contextLocale;
  const wrapperClassName = classnames(styles.datePickerWrapper, {
    // react-datepicker uses this class name to not close the date picker when
    // the activator is clicked
    // https://github.com/Hacker0x01/react-datepicker/blob/master/src/index.jsx#L905
    //
    // It uses react-onclickoutside package and declaring some elements to be
    // ignored via said class name
    // https://www.npmjs.com/package/react-onclickoutside#marking-elements-as-skip-over-this-one-during-the-event-loop
    "react-datepicker-ignore-onclickoutside": !inline && open,
    [styles.fullWidth]: fullWidth,
  });
  const datePickerClassNames = classnames(styles.datePicker, {
    [styles.inline]: inline,
  });
  const { pickerRef } = useEscapeKeyToCloseDatePicker(open, ref);

  if (smartAutofocus) {
    useRefocusOnActivator(open);
    useEffect(focusOnSelectedDate, [open]);
  }

  return (
    <div className={wrapperClassName} ref={ref} data-elevation={"elevated"}>
      <ReactDatePicker
        ref={pickerRef}
        calendarClassName={datePickerClassNames}
        showPopperArrow={false}
        selected={selected}
        inline={inline}
        disabled={disabled}
        readOnly={readonly}
        onChange={handleChange}
        maxDate={maxDate}
        preventOpenOnFocus={true}
        minDate={minDate}
        useWeekdaysShort={true}
        customInput={
          <DatePickerActivator activator={activator} fullWidth={fullWidth} />
        }
        renderCustomHeader={props => <DatePickerCustomHeader {...props} />}
        onCalendarOpen={handleCalendarOpen}
        onCalendarClose={handleCalendarClose}
        dateFormat={[
          dateFormat,
          "P",
          "PP",
          "PPP",
          "MMM dd yyyy",
          "MMMM dd yyyy",
        ]}
        highlightDates={highlightDates}
        onMonthChange={onMonthChange}
        locale={effectiveLocale}
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

function useEscapeKeyToCloseDatePicker(
  open: boolean,
  ref: React.RefObject<HTMLDivElement>,
): { pickerRef: React.RefObject<ReactDatePicker> } {
  const pickerRef = useRef<ReactDatePicker>(null);

  const escFunction = (event: KeyboardEvent) => {
    if (event.key === "Escape" && open) {
      // Close the picker ourselves and prevent propagation so that ESC presses with the picker open
      // do not close parent elements that may also be listening for ESC presses such as Modals
      pickerRef.current?.setOpen(false);
      event.stopPropagation();
    }
  };
  useEffect(() => {
    ref.current?.addEventListener("keydown", escFunction);

    return () => {
      ref.current?.removeEventListener("keydown", escFunction);
    };
  }, [open, ref, pickerRef]);

  return {
    pickerRef,
  };
}
