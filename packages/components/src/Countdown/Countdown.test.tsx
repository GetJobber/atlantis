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

  expect(container.innerHTML.includes("dd")).toBeTruthy();
  expect(container.innerHTML.includes("hh")).toBeTruthy();
  expect(container.innerHTML.includes("mm")).toBeTruthy();
  expect(container.innerHTML.includes("ss")).toBeTruthy();
});

it(`Should have the right units show up when they're supposed to`, () => {
  const { container } = render(
    <Countdown
      date={new Date(new Date().getTime() + 25 * 3600 * 1000)}
      granularity="d"
      showUnits={true}
    />,
  );

  const string = container.querySelector("p").innerHTML;
  expect(string.includes("dd")).toBeTruthy();
  expect(string.includes("hh")).toBeFalsy();
  expect(string.includes("mm")).toBeFalsy();
  expect(string.includes("ss")).toBeFalsy();
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
