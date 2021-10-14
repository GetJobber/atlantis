import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Countdown } from "./Countdown";

jest.useFakeTimers();

afterEach(cleanup);

it(`Shows units`, () => {
  const { container } = render(
    <Countdown
      date={new Date(new Date().getTime() + 25 * 3600 * 1000)}
      granularity="dhms"
      showUnits={true}
    />,
  );

  expect(container.innerHTML.includes("days")).toBeTruthy();
  expect(container.innerHTML.includes("hours")).toBeTruthy();
  expect(container.innerHTML.includes("minutes")).toBeTruthy();
  expect(container.innerHTML.includes("seconds")).toBeTruthy();
});

it(`Should have the right units show up when they're supposed to`, () => {
  const { container } = render(
    <Countdown
      date={new Date(new Date().getTime() + 25 * 3600 * 1000)}
      granularity="d"
      showUnits={true}
    />,
  );

  const string = container.innerHTML;
  expect(string.includes("days")).toBeTruthy();
  expect(string.includes("hours")).toBeFalsy();
  expect(string.includes("minutes")).toBeFalsy();
  expect(string.includes("seconds")).toBeFalsy();
});

it(`Should fire onComplete once the time is up!`, () => {
  const completeHandler = jest.fn();

  render(
    <Countdown
      date={new Date(new Date().getTime() + 2000)}
      granularity="d"
      showUnits={true}
      onComplete={completeHandler}
    />,
  );

  jest.runAllTimers();

  expect(completeHandler).toHaveBeenCalled();
});
