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
  const isoTestDate = getISOString(testDate);

  expect(
    renderer.create(<FormatRelativeDateTime date={civilTestDate} />).toJSON(),
  ).toMatchInlineSnapshot(`"5 minutes ago"`);
  expect(
    renderer.create(<FormatRelativeDateTime date={isoTestDate} />).toJSON(),
  ).toMatchInlineSnapshot(`"5 minutes ago"`);
  expect(
    renderer.create(<FormatRelativeDateTime date={testDate} />).toJSON(),
  ).toMatchInlineSnapshot(`"5 minutes ago"`);
});

it("renders 1 minute ago when less than a minute ago", () => {
  const testDate = new Date(Date.now());
  testDate.setSeconds(testDate.getSeconds() - 25);

  const civilTestDate = getCivilTime(testDate);
  const isoTestDate = getISOString(testDate);

  expect(
    renderer.create(<FormatRelativeDateTime date={civilTestDate} />).toJSON(),
  ).toMatchInlineSnapshot(`"1 minute ago"`);
  expect(
    renderer.create(<FormatRelativeDateTime date={isoTestDate} />).toJSON(),
  ).toMatchInlineSnapshot(`"1 minute ago"`);
  expect(
    renderer.create(<FormatRelativeDateTime date={testDate} />).toJSON(),
  ).toMatchInlineSnapshot(`"1 minute ago"`);
});

it("renders the time when less than a day ago", () => {
  const testDate = new Date(Date.now());
  testDate.setHours(testDate.getHours() - 9);

  const hours = testDate.getHours();
  const minutes = testDate.getMinutes();
  const expectedStr = hours + ":" + minutes + " AM";

  const civilTestDate = getCivilTime(testDate);
  const isoTestDate = getISOString(testDate);

  expect(
    renderer.create(<FormatRelativeDateTime date={civilTestDate} />).toJSON(),
  ).toEqual(expectedStr);
  expect(
    renderer.create(<FormatRelativeDateTime date={isoTestDate} />).toJSON(),
  ).toEqual(expectedStr);
  expect(
    renderer.create(<FormatRelativeDateTime date={testDate} />).toJSON(),
  ).toEqual(expectedStr);
});

it("renders the day when less than 7 days ago", () => {
  const testDate = new Date(Date.now());
  testDate.setDate(testDate.getDate() - 3);

  const civilTestDate = getCivilTime(testDate);
  const isoTestDate = getISOString(testDate);

  expect(
    renderer.create(<FormatRelativeDateTime date={civilTestDate} />).toJSON(),
  ).toMatchInlineSnapshot('"Mon"');
  expect(
    renderer.create(<FormatRelativeDateTime date={isoTestDate} />).toJSON(),
  ).toMatchInlineSnapshot('"Mon"');
  expect(
    renderer.create(<FormatRelativeDateTime date={testDate} />).toJSON(),
  ).toMatchInlineSnapshot('"Mon"');
});

it("renders the month and date when less than 1 year ago", () => {
  const testDate = new Date(Date.now());
  testDate.setDate(testDate.getDate() - 60);

  const civilTestDate = getCivilTime(testDate);
  const isoTestDate = getISOString(testDate);

  expect(
    renderer.create(<FormatRelativeDateTime date={civilTestDate} />).toJSON(),
  ).toMatchInlineSnapshot('"Apr 26"');
  expect(
    renderer.create(<FormatRelativeDateTime date={isoTestDate} />).toJSON(),
  ).toMatchInlineSnapshot('"Apr 26"');
  expect(
    renderer.create(<FormatRelativeDateTime date={testDate} />).toJSON(),
  ).toMatchInlineSnapshot('"Apr 26"');
});

it("renders the month and date when yesterday's date 1 year previous (border case)", () => {
  const testDate = new Date(Date.now());
  testDate.setFullYear(testDate.getFullYear() - 1);
  testDate.setDate(testDate.getDate() + 2); //The +2 vs. +1 is a fudge for leap year

  const civilTestDate = getCivilTime(testDate);
  const isoTestDate = getISOString(testDate);

  expect(
    renderer.create(<FormatRelativeDateTime date={civilTestDate} />).toJSON(),
  ).toMatchInlineSnapshot('"Jun 27"');
  expect(
    renderer.create(<FormatRelativeDateTime date={isoTestDate} />).toJSON(),
  ).toMatchInlineSnapshot('"Jun 27"');
  expect(
    renderer.create(<FormatRelativeDateTime date={testDate} />).toJSON(),
  ).toMatchInlineSnapshot('"Jun 27"');
});

it("renders the month day, year when over a year ago", () => {
  const testDate = new Date(Date.now());
  testDate.setFullYear(testDate.getFullYear() - 2);

  const civilTestDate = getCivilTime(testDate);
  const isoTestDate = getISOString(testDate);

  expect(
    renderer.create(<FormatRelativeDateTime date={civilTestDate} />).toJSON(),
  ).toMatchInlineSnapshot('"Jun 25, 2018"');
  expect(
    renderer.create(<FormatRelativeDateTime date={isoTestDate} />).toJSON(),
  ).toMatchInlineSnapshot('"Jun 25, 2018"');
  expect(
    renderer.create(<FormatRelativeDateTime date={testDate} />).toJSON(),
  ).toMatchInlineSnapshot('"Jun 25, 2018"');
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
