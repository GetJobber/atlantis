import React, { useMemo } from "react";
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

interface CalendarDatePickerGridProps {
  readonly selected?: Date[];
  readonly viewingDate: Date;
  readonly minDate?: Date;
  readonly maxDate?: Date;
  readonly hightlightedDates: Date[];
  readonly weekStartsOnMonday: boolean;
  readonly range: boolean;
  readonly onChange?: (date: Date[]) => void;
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
}: CalendarDatePickerGridProps): JSX.Element => {
  const grid = useRowsAndCells({
    selected,
    minDate,
    maxDate,
    hightlightedDates,
    weekStartsOnMonday,
    range,
    viewingDate,
    onChange,
  });

  return <div>{grid}</div>;
};

/**
 * Builds a grid off cell components for each date of the month
 * being viewed. Determines styling properties for each cell based
 * on if the cell date is selected, is the current date or falls
 * in a different month.
 */
// eslint-disable-next-line max-statements
function useRowsAndCells({
  viewingDate,
  selected,
  minDate,
  maxDate,
  hightlightedDates,
  weekStartsOnMonday,
  range,
  onChange,
}: {
  viewingDate: Date;
  selected: Date[];
  minDate?: Date;
  maxDate?: Date;
  hightlightedDates: Date[];
  weekStartsOnMonday: boolean;
  range: boolean;
  onChange?: (date: Date[]) => void;
}) {
  const rows = [
    <DaysOfTheWeekRow key="weekdays" weekStartsOnMonday={weekStartsOnMonday} />,
  ];

  const mapOfHighlightedDates = useMemo(
    () =>
      hightlightedDates.reduce((acc, date) => {
        acc[startOfDay(date).getTime()] = true;

        return acc;
      }, {} as Record<string, boolean>),
    [hightlightedDates],
  );

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

      const onToggle = () => {
        if (range) {
          if (selected.length === 0) {
            onChange?.([dateOfCell]);
          } else if (selected.length === 1) {
            if (dateOfCell < selected[0]) {
              onChange?.([dateOfCell, selected[0]]);
            } else {
              onChange?.([selected[0], dateOfCell]);
            }
          } else {
            onChange?.([dateOfCell]);
          }
        } else if (isSelected) {
          onChange?.(selected.filter(date => !datesAreEqual(date, dateOfCell)));
        } else {
          onChange?.([...selected, dateOfCell]);
        }
      };

      cells.push(
        <DayCell
          key={`cell-${x * 7 + y}`}
          date={dateOfCell.getTime()}
          inMonth={isInCurrentMonth}
          selected={isSelected}
          isCurrentDate={isCurrentDate}
          onToggle={onToggle}
          highlighted={mapOfHighlightedDates[dateOfCell.getTime()]}
          disabled={!!isDisabled}
          range={getRangeType(dateOfCell, selected)}
        />,
      );
    }
    rows.push(<WeekRow key={`row-${x}`}>{cells}</WeekRow>);
  }

  return rows;
}

function getRangeType(date: Date, selected: Date[]) {
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
