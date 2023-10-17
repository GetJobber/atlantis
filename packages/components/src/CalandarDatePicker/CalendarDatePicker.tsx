import React, { useCallback } from "react";
import classNames from "./CalendarDatePicker.css";
import { CalendarDatePickerHeader } from "./components/CalendarDatePickerHeader";
import { CalendarDatePickerGrid } from "./components/CalendarDatePickerGrid";

export interface CalendarDatePickerProps {
  readonly selected: Date[];
  readonly hightlightedDates?: Date[];
  readonly minDate?: Date;
  readonly maxDate?: Date;
  readonly weekStartsOnMonday?: boolean;
  readonly range?: boolean;
  readonly onChange?: (date: Date[]) => void;
  readonly onMonthChange?: (date: Date) => void;
}

const today = () => new Date();

export const CalendarDatePicker = ({
  selected,
  hightlightedDates,
  minDate,
  maxDate,
  weekStartsOnMonday,
  range,
  onChange,
  onMonthChange,
}: CalendarDatePickerProps) => {
  const [viewingDate, setViewingDate] = React.useState<Date>(
    selected[selected.length - 1] || today(),
  );

  const onMonthChangeInternal = useCallback(
    (date: Date) => {
      setViewingDate(date);
      onMonthChange?.(date);
    },
    [setViewingDate, onMonthChange],
  );

  return (
    <CalendarMultiDatePickerComponent
      selected={selected}
      hightlightedDates={hightlightedDates}
      minDate={minDate}
      maxDate={maxDate}
      viewingDate={viewingDate}
      weekStartsOnMonday={weekStartsOnMonday}
      range={range}
      onChange={onChange}
      onMonthChange={onMonthChangeInternal}
    />
  );
};

type CalendarMultiDatePickerComponentProps = CalendarDatePickerProps & {
  readonly viewingDate: Date;
};

export function CalendarMultiDatePickerComponent({
  selected,
  hightlightedDates = [],
  minDate,
  maxDate,
  viewingDate,
  weekStartsOnMonday,
  range,
  onChange,
  onMonthChange,
}: CalendarMultiDatePickerComponentProps) {
  return (
    <div className={classNames.container}>
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
}
