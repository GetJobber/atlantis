import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CalendarDatePicker,
  CalendarDatePickerProps,
} from "./CalendarDatePicker";

// Setup

export function setup(props: CalendarDatePickerProps) {
  user = userEvent.setup();

  render(<Wrapper {...props} />);
}

// Queries

export function getPreviousMonthButton() {
  return screen.getByLabelText("Previous month");
}

export function getNextMonthButton() {
  return screen.getByLabelText("Next month");
}

export function getSelectedCell() {
  return screen.getByRole("gridcell", { selected: true });
}

export function getCellByDate(date: Date) {
  const cell = screen
    .getAllByRole("gridcell")
    .find(
      _ =>
        _.dataset.date ===
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    );

  if (!cell) {
    throw new Error(`Could not find cell for date ${date}`);
  }

  return cell;
}

export function getTabbableCell() {
  const cell = screen.getAllByRole("gridcell").find(_ => _.tabIndex === 0);

  if (!cell) {
    throw new Error("Could not find tabbable cell");
  }

  return cell;
}

export function querySelectedCell() {
  return screen.queryByRole("gridcell", { selected: true });
}

// Events

export function iClickPreviousMonth() {
  return user.click(getPreviousMonthButton());
}

export function iClickNextMonth() {
  return user.click(getNextMonthButton());
}

export function iClickDay(day: DayOfMonth) {
  return user.click(screen.getByText(day));
}

export function iPressUpArrow() {
  return user.keyboard("{ArrowUp}");
}

export function iPressRightArrow() {
  return user.keyboard("{ArrowRight}");
}

export function iPressLeftArrow() {
  return user.keyboard("{ArrowLeft}");
}

export function iPressDownArrow() {
  return user.keyboard("{ArrowDown}");
}

export function iPressTab() {
  return user.keyboard("{Tab}");
}

export function iPressPageUp({ shiftKey }: { shiftKey?: true } = {}) {
  if (shiftKey) return user.keyboard("{Shift>}{PageUp}{/Shift}");

  return user.keyboard("{PageUp}");
}

export function iPressPageDown({ shiftKey }: { shiftKey?: true } = {}) {
  if (shiftKey) return user.keyboard("{Shift>}{PageDown}{/Shift}");

  return user.keyboard("{PageDown}");
}

export function iNavigateToTheNextMonthUsingTheKeyboard() {
  return iPressPageDown();
}

export function iNavigateToThePreviousMonthUsingTheKeyboard() {
  return iPressPageUp();
}

export function iNavigateToTheNextYearUsingTheKeyboard() {
  return iPressPageDown({ shiftKey: true });
}

export function iNavigateToThePreviousYearUsingTheKeyboard() {
  return iPressPageUp({ shiftKey: true });
}

export function iClickOutsideOfTheCalendar() {
  return user.click(
    screen.getByText("Area outside of the calendar date picker"),
  );
}

// Helpers

export function toDateAttributeValue(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

// Private

let user = userEvent.setup();

function Wrapper(props: CalendarDatePickerProps) {
  const [date, setDate] = useState<unknown>(props.selected);

  return (
    <>
      <CalendarDatePicker
        {...props}
        onChange={value => {
          setDate(value);
          // @ts-expect-error Could be a date or an array of dates
          props.onChange(value);
        }}
        // @ts-expect-error Could be a date or an array of dates
        selected={date}
      />
      <div>Area outside of the calendar date picker</div>
    </>
  );
}

type DayOfMonth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;
