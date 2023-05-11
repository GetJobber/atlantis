import React from "react";
import { render } from "@testing-library/react";
import { CivilDateTime } from "@std-proposal/temporal";
import { FormatRelativeDateTime } from "./FormatRelativeDateTime";

describe.skip("Less than an hour ago", () => {
  const testDate = new Date();
  testDate.setMinutes(testDate.getMinutes() - 5);
  const dates = getMockDates(testDate);

  it.each(Object.entries(dates))("renders x minutes ago for %s", (_, value) => {
    const { getByText } = render(<FormatRelativeDateTime date={value} />);
    expect(getByText("5 minutes ago")).toBeDefined();
  });
});

describe.skip("Less than a minute ago", () => {
  const testDate = new Date();
  testDate.setSeconds(testDate.getSeconds() - 25);
  const dates = getMockDates(testDate);

  it.each(Object.entries(dates))("renders 1 minute ago for %s", (_, value) => {
    const { getByText } = render(<FormatRelativeDateTime date={value} />);
    expect(getByText("1 minute ago")).toBeDefined();
  });
});

describe("Less than a day ago", () => {
  const testDate = new Date();
  testDate.setHours(testDate.getHours() - 9);
  const dates = getMockDates(testDate);

  it.each(Object.entries(dates))("renders time ago for %s", (_, value) => {
    const expectedTime = testDate
      .toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
      })
      // The space between  HH:MM and AM/PM is a non-breaking space which
      // breaks the test.
      .replace(/[\u202F]/, " ");
    const { getByText } = render(<FormatRelativeDateTime date={value} />);
    expect(getByText(expectedTime, { exact: false })).toBeDefined();
  });
});

describe("Less than 7 days ago", () => {
  const testDate = new Date();
  testDate.setDate(testDate.getDate() - 3);
  const dates = getMockDates(testDate);

  it.each(Object.entries(dates))("renders the day for %s", (_, value) => {
    const { getByText } = render(<FormatRelativeDateTime date={value} />);
    expect(
      getByText(testDate.toLocaleDateString(undefined, { weekday: "short" })),
    ).toBeDefined();
  });
});

describe("Less than 1 year ago", () => {
  const testDate = new Date();
  testDate.setDate(testDate.getDate() - 60);
  const dates = getMockDates(testDate);

  it.each(Object.entries(dates))(
    "renders the month and date for %s",
    (_, value) => {
      const { getByText } = render(<FormatRelativeDateTime date={value} />);
      expect(
        getByText(
          testDate.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          }),
        ),
      ).toBeDefined();
    },
  );
});

describe("Yesterday's date 1 year previous (border case)", () => {
  const testDate = new Date();
  testDate.setFullYear(testDate.getFullYear() - 1);
  testDate.setDate(testDate.getDate() + 2); //The +2 vs. +1 is a fudge for leap year
  const dates = getMockDates(testDate);

  it.each(Object.entries(dates))(
    "renders the month and date for %s",
    (_, value) => {
      const { getByText } = render(<FormatRelativeDateTime date={value} />);
      expect(
        getByText(
          testDate.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          }),
        ),
      ).toBeDefined();
    },
  );
});

describe("Over a year ago", () => {
  const testDate = new Date();
  testDate.setFullYear(testDate.getFullYear() - 2);
  const dates = getMockDates(testDate);

  it.each(Object.entries(dates))(
    "renders the month day, year for %s",
    (_, value) => {
      const { getByText } = render(<FormatRelativeDateTime date={value} />);
      expect(
        getByText(
          testDate.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        ),
      ).toBeDefined();
    },
  );
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
