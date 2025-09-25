/* eslint-disable import/no-internal-modules */
import React, { useMemo, useRef, useState } from "react";
import { DaysOfTheWeekRow } from "./DaysOfTheWeekRow";
import { DayCell } from "./DayCell";
import { WeekRow } from "./WeekRow";
import {
  addDays,
  endOfMonth,
  isSameDay,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "../utils";
import { useGridKeyboardControl } from "../hooks/useGridKeyboardControl";
import { useSyncFocusAndViewingDate } from "../hooks/useSyncFocusAndViewingDate";
import { useOnToggleDate } from "../hooks/useOnToggleDate";
import { useHighlightedDatesGroupedByTimeStamp } from "../hooks/useHighlightedDatesGroupedByTimeStamp";

type CalendarDatePickerGridProps = Readonly<{
  selected?: Date[];
  viewingDate: Date;
  minDate?: Date;
  maxDate?: Date;
  highlightedDates: Date[];
  weekStartsOnMonday: boolean;
  translations?: Readonly<{
    highlighted?: string;
    "Choose date"?: string;
    Choose?: string;
  }>;
  range: boolean;
  onChange?: (date: Date[], method: "click" | "enter" | "space") => void;
  onMonthChange?: (date: Date) => void;
}>;

export const CalendarDatePickerGrid = ({
  selected = [],
  viewingDate,
  highlightedDates = [],
  minDate,
  maxDate,
  range,
  weekStartsOnMonday,
  translations,
  onChange,
  onMonthChange,
}: CalendarDatePickerGridProps): JSX.Element => {
  const [tabbableDate, setTabbableDate] = useState<Date>(
    selected[0] || viewingDate,
  );

  const onToggle = useOnToggleDate({
    selected,
    range,
    onChange,
    setTabbableDate,
  });

  const grid = useRowsAndCells({
    selected,
    minDate,
    maxDate,
    highlightedDates,
    weekStartsOnMonday,
    range,
    viewingDate,
    tabbableDate,
    translations,
    onToggle,
  });

  const onKeyDown = useGridKeyboardControl({
    setTabbableDate,
    onToggle,
  });

  useSyncFocusAndViewingDate({
    viewingDate,
    tabbableDate,
    setTabbableDate,
    onMonthChange,
  });

  const id = useRef(`calendar-${Math.random()}`).current;

  return (
    <div
      role="grid"
      onKeyDown={onKeyDown}
      id={id}
      data-range={range}
      aria-label={translations?.["Choose date"] || "Choose date"}
    >
      {grid}
    </div>
  );
};

// eslint-disable-next-line max-statements
function useRowsAndCells({
  viewingDate,
  selected,
  minDate,
  maxDate,
  highlightedDates,
  weekStartsOnMonday,
  translations,
  range,
  tabbableDate,
  onToggle,
}: {
  viewingDate: Date;
  selected: Date[];
  minDate?: Date;
  maxDate?: Date;
  highlightedDates: Date[];
  weekStartsOnMonday: boolean;
  translations: CalendarDatePickerGridProps["translations"];
  range: boolean;
  tabbableDate: Date;
  onToggle: (
    date: Date,
    method: "click" | "enter" | "space",
    isSelected?: boolean,
  ) => void;
}) {
  const rows = [
    <DaysOfTheWeekRow key="weekdays" weekStartsOnMonday={weekStartsOnMonday} />,
  ];

  const mapOfHighlightedDates =
    useHighlightedDatesGroupedByTimeStamp(highlightedDates);

  const { month, lastDateOfTheMonth, startDate } = useMemo(() => {
    const firstDayOfTheMonth = startOfMonth(viewingDate);

    const initialStartDate = addDays(
      startOfWeek(startOfMonth(viewingDate)),
      weekStartsOnMonday ? 1 : 0,
    );

    return {
      currentDate: startOfDay(new Date()),
      month: viewingDate.getMonth(),
      lastDateOfTheMonth: startOfDay(endOfMonth(viewingDate)),
      startDate:
        initialStartDate.getTime() > firstDayOfTheMonth.getTime()
          ? addDays(initialStartDate, -7)
          : initialStartDate,
    };
  }, [viewingDate, weekStartsOnMonday]);

  // Some months need 6 rows rather than 5
  const rowsNeeded = Math.ceil(
    (lastDateOfTheMonth.getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24) /
      7,
  );

  // For each week of the month
  for (let x = 0; x <= rowsNeeded - 1; x++) {
    const cells = [];

    // For each day of the week
    for (let y = 0; y <= 6; y++) {
      // The date for this cell
      const dateOfCell = addDays(startDate, x * 7 + y);
      const isInCurrentMonth = dateOfCell.getMonth() === month;
      const isSelected = selected
        ? selected.some(date => isSameDay(dateOfCell, date))
        : false;

      const isDisabled =
        (minDate && dateOfCell < minDate) || (maxDate && dateOfCell > maxDate);

      const onToggleCell = () => {
        onToggle(dateOfCell, "click", isSelected);
      };

      cells.push(
        <DayCell
          key={`cell-${x * 7 + y}`}
          date={dateOfCell.getTime()}
          inMonth={isInCurrentMonth}
          selected={isSelected}
          onToggle={onToggleCell}
          highlighted={mapOfHighlightedDates[dateOfCell.getTime()]}
          disabled={!!isDisabled}
          translations={translations}
          range={
            range ? getRangeIndicatorForCell(dateOfCell, selected) : "none"
          }
          tabbable={isSameDay(dateOfCell, tabbableDate)}
        />,
      );
    }
    rows.push(<WeekRow key={`row-${x}`}>{cells}</WeekRow>);
  }

  return rows;
}

function getRangeIndicatorForCell(date: Date, selected: Date[]) {
  const [start, end] = selected;

  if (start && isSameDay(date, start)) {
    return "start";
  } else if (end && isSameDay(date, end)) {
    return "end";
  } else if (start && end && date > start && date < end) {
    return "between";
  }

  return "none";
}
