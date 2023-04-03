import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react";
import { Countdown } from "./Countdown";

jest.useFakeTimers();

afterEach(cleanup);

it(`Shows units`, () => {
  const { container } = render(
    <Countdown
      date={new Date(new Date().getTime() + 48 * 3600 * 1000)}
      granularity="dhms"
      showUnits={true}
    />,
  );

  expect(container.innerHTML).toContain("days");
  expect(container.innerHTML).toContain("hours");
  expect(container.innerHTML).toContain("minutes");
  expect(container.innerHTML).toContain("seconds");
});

it(`Should have the right units show up when they're supposed to`, () => {
  const { container } = render(
    <Countdown
      date={new Date(new Date().getTime() + 48 * 3600 * 1000)}
      granularity="d"
      showUnits={true}
    />,
  );

  expect(container.innerHTML).toContain("days");
  expect(container.innerHTML).not.toContain("hours");
  expect(container.innerHTML).not.toContain("minutes");
  expect(container.innerHTML).not.toContain("seconds");
});

it(`Should fire onComplete once the time is up!`, async () => {
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

  await waitFor(() => expect(completeHandler).toHaveBeenCalled());
});
