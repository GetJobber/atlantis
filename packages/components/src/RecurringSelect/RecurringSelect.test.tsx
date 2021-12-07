/* eslint-disable max-statements */
/* tslint:disable no-relative-imports */
import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { RecurringSelect } from "./RecurringSelect";
// eslint-disable-next-line
import { DayOfMonth, DurationPeriod, WeekDay } from "./types";

afterEach(cleanup);

let onChange: jest.Mock;

describe("RecurringSelect", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });

  it("should render the recurring select component", () => {
    const tree = renderer
      .create(
        <RecurringSelect
          data-testid="boop"
          recurrenceRule={{ interval: 1, type: DurationPeriod.Day }}
          recurrenceEnds={{
            type: "date",
            date: new Date("December 17, 2021 03:24:00"),
            numOfPeriods: 1,
            durationPeriod: DurationPeriod.Day,
          }}
          onRecurrenceChange={onChange}
          disabled={false}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe("RecurringSelect with a weekly recurrenceRule", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });

  it("should render the days of the WeeklySelect component", () => {
    const { queryAllByText, queryByLabelText } = render(
      <RecurringSelect
        data-testid="boop"
        recurrenceRule={{
          interval: 1,
          type: DurationPeriod.Week,
          weekDays: new Set(),
        }}
        recurrenceEnds={{
          type: "date",
          date: new Date("December 17, 2021 03:24:00"),
          numOfPeriods: 1,
          durationPeriod: DurationPeriod.Day,
        }}
        onRecurrenceChange={onChange}
        disabled={false}
      />,
    );

    expect(queryAllByText(/S/)).toBeTruthy();
    expect(queryAllByText(/T/)).toBeTruthy();
    expect(queryByLabelText(/F/)).toBeTruthy();
    expect(queryByLabelText(/W/)).toBeTruthy();
    expect(queryByLabelText(/M/)).toBeTruthy();
  });

  it("should call the onChange when checkbox is clicked", () => {
    const { getByLabelText } = render(
      <RecurringSelect
        data-testid="boop"
        recurrenceRule={{
          interval: 1,
          type: DurationPeriod.Week,
          weekDays: new Set(),
        }}
        recurrenceEnds={{
          type: "date",
          date: new Date("December 17, 2021 03:24:00"),
          numOfPeriods: 1,
          durationPeriod: DurationPeriod.Day,
        }}
        onRecurrenceChange={onChange}
        disabled={false}
      />,
    );

    fireEvent.click(getByLabelText(/F/i));
    expect(onChange).toHaveBeenCalled();
  });
});

describe("RecurringSelect with an existing week day selected", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });

  it("should call the onChange when checkbox is clicked", () => {
    const newWeekDaySet = new Set<WeekDay>();
    newWeekDaySet.add(WeekDay.Friday);

    const { getByLabelText } = render(
      <RecurringSelect
        data-testid="boop"
        recurrenceRule={{
          interval: 1,
          type: DurationPeriod.Week,
          weekDays: newWeekDaySet,
        }}
        recurrenceEnds={{
          type: "date",
          date: new Date("December 17, 2021 03:24:00"),
          numOfPeriods: 1,
          durationPeriod: DurationPeriod.Day,
        }}
        onRecurrenceChange={onChange}
        disabled={false}
      />,
    );

    fireEvent.click(getByLabelText(/F/i));
    expect(onChange).toHaveBeenCalled();
  });
});

describe("RecurringSelect with a daily recurrence", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });

  it("should call the onChange when interval and type are changed", () => {
    const { container } = render(
      <RecurringSelect
        data-testid="boop"
        recurrenceRule={{
          interval: 1,
          type: DurationPeriod.Day,
        }}
        recurrenceEnds={{
          type: "date",
          date: new Date("December 17, 2021 03:24:00"),
          numOfPeriods: 1,
          durationPeriod: DurationPeriod.Day,
        }}
        onRecurrenceChange={onChange}
        disabled={false}
      />,
    );

    const intervalEl = container.querySelector(
      'input[name="schedule-recurrence-interval"]',
    );
    expect(intervalEl).not.toBeNull();
    expect(intervalEl instanceof HTMLInputElement).toBe(true);

    if (intervalEl) {
      fireEvent.change(intervalEl, { target: { value: 3 } });

      expect(onChange).toHaveBeenCalledTimes(1);

      const typeEl = container.querySelector(
        'select[name="schedule-recurrence-type"]',
      );
      expect(typeEl).not.toBeNull();
      expect(typeEl instanceof HTMLSelectElement).toBe(true);

      if (typeEl) {
        fireEvent.change(typeEl, { target: { value: "Year" } });
      }

      expect(onChange).toHaveBeenCalledTimes(2);
    }
  });
});

describe("RecurringSelect with a day of month recurrenceRule", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });

  it("should render the days of the day of month component", () => {
    const { queryAllByText, queryByLabelText } = render(
      <RecurringSelect
        data-testid="boop"
        recurrenceRule={{
          interval: 1,
          type: DurationPeriod.DayOfMonth,
          date: new Set(),
        }}
        recurrenceEnds={{
          type: "date",
          date: new Date("December 17, 2021 03:24:00"),
          numOfPeriods: 1,
          durationPeriod: DurationPeriod.Day,
        }}
        onRecurrenceChange={onChange}
        disabled={false}
      />,
    );

    expect(queryAllByText("1")).toBeTruthy();
    expect(queryAllByText("2")).toBeTruthy();
    expect(queryByLabelText("3")).toBeTruthy();
    expect(queryByLabelText("4")).toBeTruthy();
    expect(queryByLabelText("5")).toBeTruthy();
  });

  it("should call the onChange when checkbox is clicked", () => {
    const newDayOfMonthSet = new Set<DayOfMonth>();
    const { getByLabelText } = render(
      <RecurringSelect
        data-testid="boop"
        recurrenceRule={{
          interval: 1,
          type: DurationPeriod.DayOfMonth,
          date: newDayOfMonthSet,
        }}
        recurrenceEnds={{
          type: "date",
          date: new Date("December 17, 2021 03:24:00"),
          numOfPeriods: 1,
          durationPeriod: DurationPeriod.Day,
        }}
        onRecurrenceChange={onChange}
        disabled={false}
      />,
    );

    fireEvent.click(getByLabelText("1"));
    fireEvent.click(getByLabelText("2"));
    expect(onChange).toHaveBeenCalled();
  });

  it("should call the onChange when checkbox is unchecked", () => {
    const newDayOfMonthSet = new Set<DayOfMonth>();
    newDayOfMonthSet.add(1);
    const { getByLabelText } = render(
      <RecurringSelect
        data-testid="boop"
        recurrenceRule={{
          interval: 1,
          type: DurationPeriod.DayOfMonth,
          date: newDayOfMonthSet,
        }}
        recurrenceEnds={{
          type: "date",
          date: new Date("December 17, 2021 03:24:00"),
          numOfPeriods: 1,
          durationPeriod: DurationPeriod.Day,
        }}
        onRecurrenceChange={onChange}
        disabled={false}
      />,
    );

    fireEvent.click(getByLabelText("1"));
    expect(onChange).toHaveBeenCalled();
  });

  it("should render when last day selected", () => {
    const newDayOfMonthSet = new Set<DayOfMonth>();
    newDayOfMonthSet.add("LAST");
    const { getByLabelText } = render(
      <RecurringSelect
        data-testid="boop"
        recurrenceRule={{
          interval: 1,
          type: DurationPeriod.DayOfMonth,
          date: newDayOfMonthSet,
        }}
        recurrenceEnds={{
          type: "date",
          date: new Date("December 17, 2021 03:24:00"),
          numOfPeriods: 1,
          durationPeriod: DurationPeriod.Day,
        }}
        onRecurrenceChange={onChange}
        disabled={false}
      />,
    );

    fireEvent.click(getByLabelText(/Last day/i));
    expect(onChange).toHaveBeenCalled();
  });
});
