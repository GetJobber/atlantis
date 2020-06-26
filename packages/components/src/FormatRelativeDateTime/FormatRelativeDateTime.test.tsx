import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { CivilDateTime } from "@std-proposal/temporal";
import { FormatRelativeDateTime } from "./FormatRelativeDateTime";

afterEach(cleanup);
beforeEach(() => {
  Date.now = jest.fn(() => 1593115122000);
});

it("renders x minutes ago when less than an hour ago", () => {
  const testDate = new Date(Date.now());
  testDate.setMinutes(testDate.getMinutes() - 5);

  const civilTestDate = getCivilTime(testDate);

  const tree = renderer
    .create(<FormatRelativeDateTime date={civilTestDate} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`"5 minutes ago"`);
});

it("renders 1 minute ago when less than a minute ago", () => {
  const testDate = new Date(Date.now());
  testDate.setSeconds(testDate.getSeconds() - 25);

  const civilTestDate = getCivilTime(testDate);

  const tree = renderer
    .create(<FormatRelativeDateTime date={civilTestDate} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`"1 minute ago"`);
});

it("renders the time when less than a day ago", () => {
  const testDate = new Date(Date.now());
  testDate.setHours(testDate.getHours() - 9);

  const civilTestDate = getCivilTime(testDate);

  const hours = testDate.getHours();
  const minutes = testDate.getMinutes();
  const expectedStr = hours + ":" + minutes + ":35 AM";

  const tree = renderer
    .create(<FormatRelativeDateTime date={civilTestDate} />)
    .toJSON();

  expect(tree).toEqual(expectedStr);
});

it("renders the day when less than 7 days ago", () => {
  const testDate = new Date(Date.now());
  testDate.setDate(testDate.getDate() - 3);

  const civilTestDate = getCivilTime(testDate);

  const tree = renderer
    .create(<FormatRelativeDateTime date={civilTestDate} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot('"Mon"');
});

it("renders the month and date when less than 1 year ago", () => {
  const testDate = new Date(Date.now());
  testDate.setDate(testDate.getDate() - 60);

  const civilTestDate = getCivilTime(testDate);

  const tree = renderer
    .create(<FormatRelativeDateTime date={civilTestDate} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot('"Apr 26"');
});

it("renders the month and date when yesterday's date 1 year previous (border case)", () => {
  const testDate = new Date(Date.now());
  testDate.setFullYear(testDate.getFullYear() - 1);
  testDate.setDate(testDate.getDate() + 2); //The +2 vs. +1 is a fudge for leap year

  const civilTestDate = getCivilTime(testDate);

  const tree = renderer
    .create(<FormatRelativeDateTime date={civilTestDate} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot('"Jun 27"');
});

it("renders the month day, year when over a year ago", () => {
  const testDate = new Date(Date.now());
  testDate.setFullYear(testDate.getFullYear() - 2);

  const civilTestDate = getCivilTime(testDate);

  const tree = renderer
    .create(<FormatRelativeDateTime date={civilTestDate} />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot('"Jun 25, 2018"');
});

// function getNowUTC() {
//   const utcDate = new Date(Date.now());
//   utcDate.setMinutes(-1 * utcDate.getTimezoneOffset());

//   console.log("offset: " + utcDate.getTimezoneOffset());
//   return utcDate;
// }

// function getCivilTime(date: Date) {
//   const instant = Instant.fromEpochMilliseconds(date.getTime());
//   // const zonedDT = ZonedDateTime.fromEpochMilliseconds(date.getTime(), "UTC");
//   const zoneDT = new ZonedDateTime(instant, "UTC");

//   return CivilDateTime.fromZonedDateTime(zoneDT);
// }
// todo[jz] Delete before review
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
