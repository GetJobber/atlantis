import React from "react";
import { cleanup, render } from "@testing-library/react";
import { CivilDateTime } from "@std-proposal/temporal";
import { FormatRelativeDateTime } from "./FormatRelativeDateTime";

beforeEach(() => {
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date(1593115122000));
});

afterEach(() => {
  jest.useRealTimers();
  cleanup();
});

it("renders x minutes ago when less than an hour ago", () => {
  const testDate = new Date();
  testDate.setMinutes(testDate.getMinutes() - 5);
  const dates = getMockDates(testDate);

  Object.values(dates).forEach(value => {
    expect(render(<FormatRelativeDateTime date={value} />)).toEqual(
      "5 minutes ago",
    );
  });
});

it("renders 1 minute ago when less than a minute ago", () => {
  const testDate = new Date();
  testDate.setSeconds(testDate.getSeconds() - 25);
  const dates = getMockDates(testDate);

  Object.values(dates).forEach(value => {
    expect(render(<FormatRelativeDateTime date={value} />)).toEqual(
      "1 minute ago",
    );
  });
});

it("renders the time when less than a day ago", () => {
  const testDate = new Date();
  testDate.setHours(testDate.getHours() - 9);
  const dates = getMockDates(testDate);

  Object.values(dates).forEach(value => {
    expect(render(<FormatRelativeDateTime date={value} />)).toEqual(
      testDate.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
      }),
    );
  });
});

it("renders the day when less than 7 days ago", () => {
  const testDate = new Date();
  testDate.setDate(testDate.getDate() - 3);
  const dates = getMockDates(testDate);

  Object.values(dates).forEach(value => {
    expect(render(<FormatRelativeDateTime date={value} />)).toEqual(
      testDate.toLocaleDateString(undefined, { weekday: "short" }),
    );
  });
});

it("renders the month and date when less than 1 year ago", () => {
  const testDate = new Date();
  testDate.setDate(testDate.getDate() - 60);
  const dates = getMockDates(testDate);

  Object.values(dates).forEach(value => {
    expect(render(<FormatRelativeDateTime date={value} />)).toEqual(
      new Date("Apr 26").toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
    );
  });
});

it("renders the month and date when yesterday's date 1 year previous (border case)", () => {
  const testDate = new Date();
  testDate.setFullYear(testDate.getFullYear() - 1);
  testDate.setDate(testDate.getDate() + 2); //The +2 vs. +1 is a fudge for leap year
  const dates = getMockDates(testDate);

  Object.values(dates).forEach(value => {
    expect(render(<FormatRelativeDateTime date={value} />)).toEqual(
      new Date("Jun 27").toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
    );
  });
});

it("renders the month day, year when over a year ago", () => {
  const testDate = new Date();
  testDate.setFullYear(testDate.getFullYear() - 2);
  const dates = getMockDates(testDate);

  Object.values(dates).forEach(value => {
    expect(render(<FormatRelativeDateTime date={value} />)).toEqual(
      new Date("Jun 25, 2018").toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    );
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
