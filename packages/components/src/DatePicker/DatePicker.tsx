import type { ReactElement } from "react";
import React, { useEffect, useId, useRef, useState } from "react";
import classnames from "classnames";
import ReactDatePicker from "react-datepicker";
import type { XOR } from "ts-xor";
import { useRefocusOnActivator } from "@jobber/hooks";
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

// eslint-disable-next-line max-statements
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
  const { pickerRef } = useEscapeKeyToCloseDatePicker(
    open,
    ref,
    focusOnSelectedDate,
    renderInsidePortal,
  );

  if (smartAutofocus) {
    useRefocusOnActivator(open);
    useEffect(() => {
      focusOnSelectedDate();
    }, [open]);
  }

  return (
    <div
      className={wrapperClassName}
      ref={ref}
      data-elevation={"elevated"}
      onKeyDown={event => {
        // React synthetic events propagate through the React component tree
        // regardless of DOM structure, so Escape from the portalled calendar
        // bubbles up here and would reach any parent floating element's dismiss
        // handler (e.g. a Modal). Stop it here so only the calendar closes.
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
        // This tells RDP to render the popper inside a portal we control.
        {...(renderInsidePortal && { portalId: uniquePortalId })}
      />
      {renderInsidePortal && <DatePickerPortal portalId={uniquePortalId} />}
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
  function handleChange(value: Date | null) {
    // TODO: Ticket created to update all DatePicker and InputDate usages to accept Date | null
    onChange(value as Date);
  }

  function handleCalendarOpen() {
    setOpen(true);
    onOpenChange?.(true);
  }

  function handleCalendarClose() {
    setOpen(false);
    onOpenChange?.(false);
  }
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
      // When the calendar is portalled outside the modal DOM, Tab no longer
      // naturally reaches the calendar. Intercept Tab and move focus to the
      // calendar ourselves to restore the pre-portal keyboard behaviour.
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

/**
 * This is one approach, continuing to allow ReactDatePicker to handle its open/close state and the activator/positioning behaviour.
 *
 * However, we don't have full control and it's making certain things difficult, like this portal behaviour and focus management.
 * What if instead of RDP controlling the activator (customInput), we instead manage it ourselves? We could render RDP (with inline=true)
 * inside our own Popover component which gives us a lot more control over positioning, open/close state, focus/blur/dismiss management,
 * and more. Unclear if this is a better approach or if it would introduce more problems, but worth considering.
 */
function DatePickerPortal({ portalId }: { readonly portalId: string }) {
  // TODO: ideally we don't always render this. However, it needs to be rendered BEFORE DatePicker tries to portal into it.

  const nodeId = useFloatingNodeId();
  const parentNodeId = useFloatingParentNodeId();

  const portalDiv = (
    <div
      id={portalId}
      style={{
        position: "absolute",
        zIndex: "var(--elevation-modal)",
      }}
    />
  );

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
