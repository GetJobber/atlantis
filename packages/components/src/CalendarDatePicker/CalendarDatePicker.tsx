import React, {
  Ref,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { XOR } from "ts-xor";
import { CalendarDatePickerHeader } from "./components/CalendarDatePickerHeader";
import { CalendarDatePickerGrid } from "./components/CalendarDatePickerGrid";

interface MultiDateSelection {
  multi: true;
  range?: false;
  selected: Date[];
  onChange: (dates: Date[], method: "click" | "enter" | "space") => void;
}

interface RangeDateSelection {
  multi?: never;
  range: true;
  selected: [] | [Date] | [Date, Date];
  onChange: (
    dates: [] | [Date] | [Date, Date],
    method: "click" | "enter" | "space",
  ) => void;
}

interface SingleDateSelection {
  multi?: false;
  selected?: Date;
  range?: never;
  onChange: (
    date: Date | undefined,
    method: "click" | "enter" | "space",
  ) => void;
}
export interface CalendarDatePickerBaseProps {
  readonly highlightedDates?: Date[];
  readonly minDate?: Date;
  readonly maxDate?: Date;
  readonly weekStartsOnMonday?: boolean;
  readonly focusonSelectedDate?: boolean;
  readonly alternate?: boolean;
  readonly translations?: {
    readonly previousMonth?: string;
    readonly nextMonth?: string;
    readonly chooseDate?: string;
    readonly highlightedLabelSuffix?: string;
  };
  readonly onMonthChange?: (date: Date) => void;
  readonly onClickOutside?: (event: MouseEvent) => void;
}

export type CalendarDatePickerProps = CalendarDatePickerBaseProps &
  XOR<MultiDateSelection, XOR<RangeDateSelection, SingleDateSelection>>;

const today = () => new Date();

export const CalendarDatePicker = forwardRef(function CalendarDatePicker(
  {
    selected,
    highlightedDates,
    minDate,
    maxDate,
    weekStartsOnMonday,
    focusonSelectedDate,
    range,
    multi,
    alternate,
    translations,
    onChange,
    onMonthChange,
    onClickOutside,
  }: CalendarDatePickerProps,
  ref: Ref<HTMLDivElement>,
) {
  const [viewingDate, setViewingDate] = React.useState<Date>(() => {
    if (multi === true || range === true) {
      return selected[0] ?? today();
    }

    return selected || today();
  });

  const date = Array.isArray(selected) ? selected[0] : selected;

  useEffect(() => {
    date && setViewingDate(date);
  }, [date]);

  const onMonthChangeInternal = useCallback(
    (next: Date) => {
      setViewingDate(next);
      onMonthChange?.(next);
    },
    [setViewingDate, onMonthChange],
  );

  const selectedDates = useMemo(
    () => (Array.isArray(selected) ? selected : selected ? [selected] : []),
    [selected],
  );

  const onChangeSelection = useCallback(
    (dates: Date[], method: "click" | "enter" | "space") => {
      if (multi === true || range === true) {
        onChange(dates as [Date, Date], method);
      } else {
        onChange(dates[dates.length - 1], method);
      }
    },
    [multi, range, onChange],
  );

  useEffect(() => {
    if (focusonSelectedDate) {
      const dt = Array.isArray(selected) ? selected[0] : selected;

      if (dt) {
        document
          .querySelector<HTMLButtonElement>(
            `[data-date="${dt.getFullYear()}-${
              dt.getMonth() + 1
            }-${dt.getDate()}"]`,
          )
          ?.focus();
      }
    }
  }, []);

  return (
    <CalendarMultiDatePickerComponent
      selected={selectedDates}
      highlightedDates={highlightedDates}
      minDate={minDate}
      maxDate={maxDate}
      viewingDate={viewingDate}
      weekStartsOnMonday={weekStartsOnMonday}
      range={!!range}
      multi={!!multi}
      alternate={alternate}
      onChange={onChangeSelection}
      onMonthChange={onMonthChangeInternal}
      onClickOutside={onClickOutside}
      translations={translations}
      ref={ref}
    />
  );
});

type CalendarMultiDatePickerComponentProps = CalendarDatePickerBaseProps & {
  readonly viewingDate: Date;
  readonly multi: boolean;
  readonly range: boolean;
  readonly selected: Date[];
  readonly onChange: (
    dates: Date[],
    method: "click" | "enter" | "space",
  ) => void;
};

export const CalendarMultiDatePickerComponent = forwardRef<
  HTMLDivElement,
  CalendarMultiDatePickerComponentProps
>(function CalendarMultiDatePickerComponent(
  {
    selected,
    highlightedDates = [],
    minDate,
    maxDate,
    viewingDate,
    weekStartsOnMonday,
    range,
    translations,
    alternate,
    onChange,
    onMonthChange,
    onClickOutside,
  }: CalendarMultiDatePickerComponentProps,
  ref,
) {
  const elRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => elRef.current as HTMLDivElement);

  useEffect(() => {
    if (onClickOutside) {
      const el = elRef.current;
      if (!el) return;

      const listener = (event: MouseEvent) => {
        if (el.contains(event.target as Node)) return;
        onClickOutside(event);
      };

      document.addEventListener("mouseup", listener);

      return () => {
        document.removeEventListener("mouseup", listener);
      };
    }
  }, [onClickOutside, elRef.current]);

  return (
    <div ref={elRef}>
      <CalendarDatePickerHeader
        month={viewingDate.getMonth()}
        year={viewingDate.getFullYear()}
        onChange={onMonthChange}
        translations={translations}
        alternate={alternate}
      />
      <div>
        <CalendarDatePickerGrid
          viewingDate={viewingDate}
          selected={selected}
          highlightedDates={highlightedDates}
          minDate={minDate}
          maxDate={maxDate}
          range={!!range}
          onChange={onChange}
          onMonthChange={onMonthChange}
          weekStartsOnMonday={!!weekStartsOnMonday}
          translations={translations}
          alternate={alternate}
        />
      </div>
    </div>
  );
});
