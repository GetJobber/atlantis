import React, { ReactElement, useEffect, useId, useRef, useState } from "react";
import classnames from "classnames";
import ReactDatePicker from "react-datepicker";
import { XOR } from "ts-xor";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import styles from "./DatePicker.module.css";
import { DatePickerCustomHeader } from "./DatePickerCustomHeader";
import {
  DatePickerActivator,
  DatePickerActivatorProps,
} from "./DatePickerActivator";
import { useFocusOnSelectedDate } from "./useFocusOnSelectedDate";
import { useAtlantisContext } from "../AtlantisContext";

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

interface DatePickerCloseDetails {
  id: string;
}

const DATEPICKER_SWITCH_EVENT = "atlantis.datepicker-switch";

/*eslint max-statements: ["error", 16]*/
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
  const { dateFormat } = useAtlantisContext();
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
  const pickerRef = useRef<ReactDatePicker>(null);
  const pickerId = useRef(useId());

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
    document.dispatchEvent(
      new CustomEvent(DATEPICKER_SWITCH_EVENT, {
        detail: { id: pickerId.current },
      }),
    );

    pickerRef.current?.setOpen(true);
    setOpen(true);
  }

  function handleCalendarClose() {
    pickerRef.current?.setOpen(false);
    setOpen(false);
  }

  // Listen for close events from other DatePickers
  useEffect(() => {
    const handleClose = (event: CustomEvent<DatePickerCloseDetails>) => {
      if (event.detail.id !== pickerId.current) {
        pickerRef.current?.setOpen(false);
        setOpen(false);
      }
    };

    document.addEventListener(
      DATEPICKER_SWITCH_EVENT,
      handleClose as EventListener,
    );

    return () => {
      document.removeEventListener(
        DATEPICKER_SWITCH_EVENT,
        handleClose as EventListener,
      );
    };
  }, []);

  // Handle ESC key
  useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        pickerRef.current?.setOpen(false);
        event.stopPropagation();
      }
    };

    document.addEventListener("keydown", escFunction, true);

    return () => {
      document.removeEventListener("keydown", escFunction, true);
    };
  }, [open]);

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
        open={open}
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
      />
    </div>
  );
}
