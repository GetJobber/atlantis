import type { ReactElement } from "react";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import classnames from "classnames";
import ReactDatePicker from "react-datepicker";
import type { XOR } from "ts-xor";
import {
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
} from "@floating-ui/react";
import styles from "./DatePicker.module.css";
import { DatePickerCustomHeader } from "./DatePickerCustomHeader";
import type { DatePickerActivatorProps } from "./DatePickerActivator";
import { DatePickerActivator } from "./DatePickerActivator";
import { useFocusOnSelectedDate } from "./useFocusOnSelectedDate";
import type { DayOfWeek } from "../sharedHelpers/types";
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
   * Sets which day is considered the first day of the week.
   * 0 = Sunday, 1 = Monday, etc.
   *
   * @default 0
   */
  readonly firstDayOfWeek?: DayOfWeek;

  /**
   * Change handler that will return the date selected.
   */
  onChange(val: Date): void;

  /**
   * Change handler when the selected month changes
   */
  onMonthChange?(val: Date): void;

  /**
   * Callback when the calendar open state changes
   */
  onOpenChange?(open: boolean): void;
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

function useDatePickerClassNames(
  inline: boolean,
  open: boolean,
  fullWidth: boolean,
) {
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

  return { wrapperClassName, datePickerClassNames };
}

function useDatePickerHandlers(
  onChange: (val: Date) => void,
  setOpen: (open: boolean) => void,
  onOpenChange?: (open: boolean) => void,
  portalled?: boolean,
) {
  const activatorRef = useRef<HTMLElement | null>(null);

  const handleChange = useCallback(
    (value: Date | null) => {
      onChange(value as Date);
    },
    [onChange],
  );
  const handleCalendarOpen = useCallback(() => {
    if (portalled) {
      // Capture synchronously during the event, before react-datepicker or the
      // portal can move focus away from the activator.
      activatorRef.current = document.activeElement as HTMLElement | null;
    }
    setOpen(true);
    onOpenChange?.(true);
  }, [setOpen, onOpenChange, portalled]);
  const handleCalendarClose = useCallback(() => {
    if (portalled) {
      // Restore focus BEFORE notifying consumers via onOpenChange so that any
      // composite focus-tracking logic (e.g. InputDateRebuilt) sees the input
      // as focused when it runs its blur check.
      activatorRef.current?.focus();
      activatorRef.current = null;
    }
    setOpen(false);
    onOpenChange?.(false);
  }, [setOpen, onOpenChange, portalled]);

  return { handleChange, handleCalendarOpen, handleCalendarClose };
}

function useSmartAutofocus(
  smartAutofocus: boolean,
  open: boolean,
  focusOnSelectedDate: () => boolean,
) {
  useEffect(() => {
    if (smartAutofocus) {
      focusOnSelectedDate();
    }
  }, [open, smartAutofocus, focusOnSelectedDate]);
}

export function DatePicker({
  onChange,
  onMonthChange,
  onOpenChange,
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
  firstDayOfWeek,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const { dateFormat, firstDayOfWeek: contextFirstDayOfWeek } =
    useAtlantisContext();
  const effectiveFirstDayOfWeek = firstDayOfWeek ?? contextFirstDayOfWeek;
  const renderInsidePortal = !inline;
  const uniquePortalId = useId();
  const { ref, focusOnSelectedDate } = useFocusOnSelectedDate(uniquePortalId);
  const { wrapperClassName, datePickerClassNames } = useDatePickerClassNames(
    inline ?? false,
    open,
    fullWidth ?? false,
  );
  const { pickerRef } = useEscapeKeyToCloseDatePicker(
    open,
    ref,
    focusOnSelectedDate,
    renderInsidePortal,
  );
  const { handleChange, handleCalendarOpen, handleCalendarClose } =
    useDatePickerHandlers(onChange, setOpen, onOpenChange, renderInsidePortal);
  useSmartAutofocus(smartAutofocus ?? true, open, focusOnSelectedDate);

  return (
    <div
      className={wrapperClassName}
      ref={ref}
      data-elevation={"elevated"}
      onKeyDown={event => {
        // Stop Escape from bubbling to parent floating elements (e.g. Modal).
        if (event.key === "Escape" && open) {
          event.stopPropagation();
        }
      }}
    >
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
        calendarStartDay={effectiveFirstDayOfWeek}
        popperPlacement="bottom-start"
        {...(renderInsidePortal && { portalId: uniquePortalId })}
      />
      {renderInsidePortal && <DatePickerPortal portalId={uniquePortalId} />}
    </div>
  );
}

function useEscapeKeyToCloseDatePicker(
  open: boolean,
  ref: React.RefObject<HTMLDivElement | null>,
  focusOnSelectedDate: () => boolean,
  isPortalled: boolean,
): { pickerRef: React.RefObject<ReactDatePicker | null> } {
  const pickerRef = useRef<ReactDatePicker>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && open) {
      // Close the picker ourselves and prevent propagation so that ESC presses with the picker open
      // do not close parent elements that may also be listening for ESC presses such as Modals
      pickerRef.current?.setOpen(false);
      event.stopPropagation();
    }

    if (event.key === "Tab" && open && isPortalled) {
      // When portalled, Tab from the activator doesn't reach the calendar.
      // Intercept Tab to move focus there (mainly when smartAutofocus is false
      // and focus stayed in the input).
      const focused = focusOnSelectedDate();

      if (focused) {
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    ref.current?.addEventListener("keydown", handleKeyDown);

    return () => {
      ref.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, ref, pickerRef, isPortalled]);

  return {
    pickerRef,
  };
}

function DatePickerPortal({ portalId }: { readonly portalId: string }) {
  const nodeId = useFloatingNodeId();
  const parentNodeId = useFloatingParentNodeId();

  const portalDiv = <div id={portalId} className={styles.portalContainer} />;

  if (parentNodeId) {
    return (
      <FloatingTree>
        <FloatingNode id={nodeId}>
          <FloatingPortal>{portalDiv}</FloatingPortal>
        </FloatingNode>
      </FloatingTree>
    );
  }

  return <FloatingPortal>{portalDiv}</FloatingPortal>;
}
