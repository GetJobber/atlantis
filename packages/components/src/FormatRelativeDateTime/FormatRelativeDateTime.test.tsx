import React from "react";
import { cleanup, render } from "@testing-library/react";
import { CivilDateTime } from "@std-proposal/temporal";
import { FormatRelativeDateTime } from "./FormatRelativeDateTime";

afterEach(cleanup);

beforeEach(() => {
  Date.now = jest.fn(() => 1593115122000);
});

let testDate;
let result;
let civilTestDate;
let isoTestDate;

describe("renders x minutes ago when less than an hour ago", () => {
  beforeEach(() => {
    testDate = new Date(Date.now());
    testDate.setMinutes(testDate.getMinutes() - 5);
    civilTestDate = getCivilTime(testDate);
    isoTestDate = getISOString(testDate);
    result = "5 minutes ago";
  });

  it("handles regular date", () => {
    const { getByText } = render(<FormatRelativeDateTime date={testDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles CivilTime", () => {
    const { getByText } = render(
      <FormatRelativeDateTime date={civilTestDate} />,
    );
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles ISOString", () => {
    const { getByText } = render(<FormatRelativeDateTime date={isoTestDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });
});

describe("renders 1 minute ago when less than a minute ago", () => {
  beforeEach(() => {
    testDate = new Date(Date.now());
    testDate.setSeconds(testDate.getSeconds() - 25);
    civilTestDate = getCivilTime(testDate);
    isoTestDate = getISOString(testDate);
    result = "1 minute ago";
  });

  it("handles regular date", () => {
    const { getByText } = render(<FormatRelativeDateTime date={testDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles CivilTime", () => {
    const { getByText } = render(
      <FormatRelativeDateTime date={civilTestDate} />,
    );
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles ISOString", () => {
    const { getByText } = render(<FormatRelativeDateTime date={isoTestDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });
});

describe("renders the time when less than a day ago", () => {
  beforeEach(() => {
    testDate = new Date(Date.now());
    testDate.setHours(testDate.getHours() - 9);
    civilTestDate = getCivilTime(testDate);
    isoTestDate = getISOString(testDate);
    result = "4:58 AM";
  });

  it("handles regular date", () => {
    const { getByText } = render(<FormatRelativeDateTime date={testDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles CivilTime", () => {
    const { getByText } = render(
      <FormatRelativeDateTime date={civilTestDate} />,
    );
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles ISOString", () => {
    const { getByText } = render(<FormatRelativeDateTime date={isoTestDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });
});

describe("renders the day when less than 7 days ago", () => {
  beforeEach(() => {
    testDate = new Date(Date.now());
    testDate.setDate(testDate.getDate() - 3);
    civilTestDate = getCivilTime(testDate);
    isoTestDate = getISOString(testDate);
    result = "Mon";
  });

  it("handles regular date", () => {
    const { getByText } = render(<FormatRelativeDateTime date={testDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles CivilTime", () => {
    const { getByText } = render(
      <FormatRelativeDateTime date={civilTestDate} />,
    );
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles ISOString", () => {
    const { getByText } = render(<FormatRelativeDateTime date={isoTestDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });
});

describe("renders the month and date when less than 1 year ago", () => {
  beforeEach(() => {
    testDate = new Date(Date.now());
    testDate.setDate(testDate.getDate() - 60);
    civilTestDate = getCivilTime(testDate);
    isoTestDate = getISOString(testDate);
    result = "Apr 26";
  });

  it("handles regular date", () => {
    const { getByText } = render(<FormatRelativeDateTime date={testDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles CivilTime", () => {
    const { getByText } = render(
      <FormatRelativeDateTime date={civilTestDate} />,
    );
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles ISOString", () => {
    const { getByText } = render(<FormatRelativeDateTime date={isoTestDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });
});

describe("renders the month and date when yesterday's date 1 year previous (border case)", () => {
  beforeEach(() => {
    testDate = new Date(Date.now());
    testDate.setFullYear(testDate.getFullYear() - 1);
    testDate.setDate(testDate.getDate() + 2); //The +2 vs. +1 is a fudge for leap year
    civilTestDate = getCivilTime(testDate);
    isoTestDate = getISOString(testDate);
    result = "Jun 27";
  });

  it("handles regular date", () => {
    const { getByText } = render(<FormatRelativeDateTime date={testDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles CivilTime", () => {
    const { getByText } = render(
      <FormatRelativeDateTime date={civilTestDate} />,
    );
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles ISOString", () => {
    const { getByText } = render(<FormatRelativeDateTime date={isoTestDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });
});

describe("renders the month day, year when over a year ago", () => {
  beforeEach(() => {
    testDate = new Date(Date.now());
    testDate.setFullYear(testDate.getFullYear() - 2);
    civilTestDate = getCivilTime(testDate);
    isoTestDate = getISOString(testDate);
    result = "Jun 25, 2018";
  });

  it("handles regular date", () => {
    const { getByText } = render(<FormatRelativeDateTime date={testDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles CivilTime", () => {
    const { getByText } = render(
      <FormatRelativeDateTime date={civilTestDate} />,
    );
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });

  it("handles ISOString", () => {
    const { getByText } = render(<FormatRelativeDateTime date={isoTestDate} />);
    expect(getByText(result)).toBeInstanceOf(HTMLDivElement);
  });
});

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

  const civilTesterDate = new CivilDateTime(
    testYear,
    testMonth,
    testDay,
    testHour,
    testMinute,
    testSecond,
  );

  return civilTesterDate;
}
