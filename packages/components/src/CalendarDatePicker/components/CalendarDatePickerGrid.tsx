import React, { useMemo, useRef, useState } from "react";
import { DaysOfTheWeekRow } from "./DaysOfTheWeekRow";
import { DayCell } from "./DayCell";
import { WeekRow } from "./WeekRow";
import {
  addDays,
  datesAreEqual,
  endOfMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "../utils";
import { useGridKeyboardControl } from "../hooks/useGridKeyboardControl";
import { useSyncFocusAndViewingDate } from "../hooks/useSyncFocusAndViewingDate";
import { useOnToggleDate } from "../hooks/useOnToggleDate";
import { useHighlightedDatesGroupedByTimeStamp } from "../hooks/useHighlightedDatesGroupedByTimeStamp";

interface CalendarDatePickerGridProps {
  readonly selected?: Date[];
  readonly viewingDate: Date;
  readonly minDate?: Date;
  readonly maxDate?: Date;
  readonly hightlightedDates: Date[];
  readonly weekStartsOnMonday: boolean;
  readonly range: boolean;
  readonly onChange?: (date: Date[]) => void;
  readonly onMonthChange?: (date: Date) => void;
}

export const CalendarDatePickerGrid = ({
  selected = [],
  viewingDate,
  hightlightedDates = [],
  minDate,
  maxDate,
  range,
  weekStartsOnMonday,
  onChange,
  onMonthChange,
}: CalendarDatePickerGridProps): JSX.Element => {
  const [focusedDate, setFocusedDate] = useState<Date>(
    selected[0] || viewingDate,
  );

  const onToggle = useOnToggleDate({
    selected,
    range,
    onChange,
    setFocusedDate,
  });

  const grid = useRowsAndCells({
    selected,
    minDate,
    maxDate,
    hightlightedDates,
    weekStartsOnMonday,
    range,
    viewingDate,
    focusedDate,
    onToggle,
  });

  const onKeyDown = useGridKeyboardControl({
    setFocusedDate,
    onToggle,
  });

  useSyncFocusAndViewingDate({
    viewingDate,
    focusedDate,
    setFocusedDate,
    onMonthChange,
  });

  const id = useRef(`calendar-${Math.random()}`).current;

  return (
    <div role="grid" onKeyDown={onKeyDown} id={id} aria-label="Choose date">
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
  hightlightedDates,
  weekStartsOnMonday,
  range,
  focusedDate,
  onToggle,
}: {
  viewingDate: Date;
  selected: Date[];
  minDate?: Date;
  maxDate?: Date;
  hightlightedDates: Date[];
  weekStartsOnMonday: boolean;
  range: boolean;
  focusedDate: Date;
  onToggle: (date: Date, isSelected?: boolean) => void;
}) {
  const rows = [
    <DaysOfTheWeekRow key="weekdays" weekStartsOnMonday={weekStartsOnMonday} />,
  ];

  const mapOfHighlightedDates =
    useHighlightedDatesGroupedByTimeStamp(hightlightedDates);

  const { currentDate, month, lastDateOfTheMonth, startDate } = useMemo(() => {
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
      const isCurrentDate = datesAreEqual(dateOfCell, currentDate);
      const isSelected = selected
        ? selected.some(date => datesAreEqual(dateOfCell, date))
        : false;

      const isDisabled =
        (minDate && dateOfCell < minDate) || (maxDate && dateOfCell > maxDate);

      const onToggleCell = () => {
        onToggle(dateOfCell, isSelected);
      };

      cells.push(
        <DayCell
          key={`cell-${x * 7 + y}`}
          date={dateOfCell.getTime()}
          inMonth={isInCurrentMonth}
          selected={isSelected}
          isCurrentDate={isCurrentDate}
          onToggle={onToggleCell}
          highlighted={mapOfHighlightedDates[dateOfCell.getTime()]}
          disabled={!!isDisabled}
          range={
            range ? getRangeIndicatorForCell(dateOfCell, selected) : "none"
          }
          hasFocus={focusedDate.getDate() === dateOfCell.getDate()}
        />,
      );
    }
    rows.push(<WeekRow key={`row-${x}`}>{cells}</WeekRow>);
  }

  return rows;
}

function getRangeIndicatorForCell(date: Date, selected: Date[]) {
  const [start, end] = selected;

  if (start && datesAreEqual(date, start)) {
    return "start";
  } else if (end && datesAreEqual(date, end)) {
    return "end";
  } else if (start && end && date > start && date < end) {
    return "between";
  }

  return "none";
}
