import React from "react";
import { cleanup, render } from "@testing-library/react";
import { CivilDateTime } from "@std-proposal/temporal";
import { FormatRelativeDateTime } from "./FormatRelativeDateTime";

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(1593115122000));
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  cleanup();
});

it("renders x minutes ago when less than an hour ago", () => {
  const testDate = new Date();
  testDate.setMinutes(testDate.getMinutes() - 5);
  const dates = getMockDates(testDate);

  Object.values(dates).forEach(value => {
    cleanup();
    const { getByText } = render(<FormatRelativeDateTime date={value} />);
    expect(getByText("5 minutes ago")).toBeDefined();
  });
});

it("renders 1 minute ago when less than a minute ago", () => {
  const testDate = new Date();
  testDate.setSeconds(testDate.getSeconds() - 25);
  const dates = getMockDates(testDate);

  Object.values(dates).forEach(value => {
    cleanup();
    const { getByText } = render(<FormatRelativeDateTime date={value} />);
    expect(getByText("1 minute ago")).toBeDefined();
  });
});

it("renders the time when less than a day ago", () => {
  const testDate = new Date();
  testDate.setHours(testDate.getHours() - 9);
  const dates = getMockDates(testDate);
  Object.values(dates).forEach(value => {
    cleanup();
    const expectedTime = testDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    const { getByText } = render(<FormatRelativeDateTime date={value} />);
    expect(getByText(expectedTime)).toBeDefined();
  });
});

it("renders the day when less than 7 days ago", () => {
  const testDate = new Date();
  testDate.setDate(testDate.getDate() - 3);
  const dates = getMockDates(testDate);

  Object.values(dates).forEach(value => {
    cleanup();
    const { getByText } = render(<FormatRelativeDateTime date={value} />);
    expect(
      getByText(testDate.toLocaleDateString(undefined, { weekday: "short" })),
    ).toBeDefined();
  });
});

it("renders the month and date when less than 1 year ago", () => {
  const testDate = new Date();
  testDate.setDate(testDate.getDate() - 60);
  const dates = getMockDates(testDate);

  Object.values(dates).forEach(value => {
    cleanup();
    const { getByText } = render(<FormatRelativeDateTime date={value} />);
    expect(
      getByText(
        new Date("Apr 26").toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        }),
      ),
    ).toBeDefined();
  });
});

it("renders the month and date when yesterday's date 1 year previous (border case)", () => {
  const testDate = new Date();
  testDate.setFullYear(testDate.getFullYear() - 1);
  testDate.setDate(testDate.getDate() + 2); //The +2 vs. +1 is a fudge for leap year
  const dates = getMockDates(testDate);

  Object.values(dates).forEach(value => {
    cleanup();
    const { getByText } = render(<FormatRelativeDateTime date={value} />);
    expect(
      getByText(
        new Date("Jun 27").toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        }),
      ),
    ).toBeDefined();
  });
});

it("renders the month day, year when over a year ago", () => {
  const testDate = new Date();
  testDate.setFullYear(testDate.getFullYear() - 2);
  const dates = getMockDates(testDate);

  Object.values(dates).forEach(value => {
    cleanup();
    const { getByText } = render(<FormatRelativeDateTime date={value} />);
    expect(
      getByText(
        new Date("Jun 25, 2018").toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      ),
    ).toBeDefined();
  });
});

function getMockDates(date: Date) {
  return {
    Date: date,
    CivilDate: getCivilTime(date),
    ISO8601DateString: getISOString(date),
  };
}

function getISOString(date: Date) {
  return date.toISOString();
}

function getCivilTime(date: Date) {
  const testYear = date.getFullYear();
  const testMonth = date.getMonth() + 1;
  const testDay = date.getDate();
  const testHour = date.getHours();
  const testMinute = date.getMinutes();
  const testSecond = 35; // Want to make sure we don't have flakiness around 0 and 59

  const civilTestDate = new CivilDateTime(
    testYear,
    testMonth,
    testDay,
    testHour,
    testMinute,
    testSecond,
  );

  return civilTestDate;
}
