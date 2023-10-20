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
import classNames from "./CalendarDatePicker.css";
import { CalendarDatePickerHeader } from "./components/CalendarDatePickerHeader";
import { CalendarDatePickerGrid } from "./components/CalendarDatePickerGrid";

interface MultiDateSelection {
  multi: true;
  range?: false;
  selected: Date[];
  onChange: (dates: Date[]) => void;
}

interface RangeDateSelection {
  multi?: never;
  range: true;
  selected: [] | [Date] | [Date, Date];
  onChange: (dates: [] | [Date] | [Date, Date]) => void;
}

interface SingleDateSelection {
  multi?: false;
  selected?: Date;
  range?: never;
  onChange: (date: Date | undefined) => void;
}
export interface CalendarDatePickerBaseProps {
  // readonly selected: Date[];
  readonly hightlightedDates?: Date[];
  readonly minDate?: Date;
  readonly maxDate?: Date;
  readonly weekStartsOnMonday?: boolean;
  readonly focusonSelectedDate?: boolean;
  readonly onMonthChange?: (date: Date) => void;
  readonly onClickOutside?: (event: MouseEvent) => void;
}

export type CalendarDatePickerProps = CalendarDatePickerBaseProps &
  XOR<MultiDateSelection, XOR<RangeDateSelection, SingleDateSelection>>;

const today = () => new Date();

export const CalendarDatePicker = forwardRef(function CalendarDatePicker(
  {
    selected,
    hightlightedDates,
    minDate,
    maxDate,
    weekStartsOnMonday,
    focusonSelectedDate,
    range,
    multi,
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
    (dates: Date[]) => {
      if (multi === true || range === true) {
        onChange(dates as [Date, Date]);
      } else {
        onChange(dates[dates.length - 1]);
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
            `button[data-date="${dt.getTime()}"]`,
          )
          ?.focus();
      }
    }
  }, []);

  return (
    <CalendarMultiDatePickerComponent
      selected={selectedDates}
      hightlightedDates={hightlightedDates}
      minDate={minDate}
      maxDate={maxDate}
      viewingDate={viewingDate}
      weekStartsOnMonday={weekStartsOnMonday}
      range={!!range}
      multi={!!multi}
      onChange={onChangeSelection}
      onMonthChange={onMonthChangeInternal}
      onClickOutside={onClickOutside}
      ref={ref}
      // ^?
    />
  );
});

type CalendarMultiDatePickerComponentProps = CalendarDatePickerBaseProps & {
  readonly viewingDate: Date;
  readonly multi: boolean;
  readonly range: boolean;
  readonly selected: Date[];
  readonly onChange: (dates: Date[]) => void;
};

export const CalendarMultiDatePickerComponent = forwardRef<
  HTMLDivElement,
  CalendarMultiDatePickerComponentProps
>(function CalendarMultiDatePickerComponent(
  {
    selected,
    hightlightedDates = [],
    minDate,
    maxDate,
    viewingDate,
    weekStartsOnMonday,
    range,
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
      />
      <div className={classNames.grid}>
        <CalendarDatePickerGrid
          viewingDate={viewingDate}
          selected={selected}
          hightlightedDates={hightlightedDates}
          minDate={minDate}
          maxDate={maxDate}
          range={!!range}
          onChange={onChange}
          weekStartsOnMonday={!!weekStartsOnMonday}
        />
      </div>
    </div>
  );
});
