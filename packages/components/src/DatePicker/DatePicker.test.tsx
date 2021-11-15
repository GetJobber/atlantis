import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { DatePicker } from "./DatePicker";

afterEach(cleanup);

beforeEach(() => {
  /**
   * We need to mock our date because DatePicker sets an initial date
   * to `new Date`, we could only predict the current date for a month.
   *
   * This will mock our system time to `April 7, 2021`.
   */
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date(2021, 3, 7));
});

it("renders only a button by default", () => {
  const { queryByText, getByLabelText } = render(
    <DatePicker selected={new Date()} onChange={jest.fn()} />,
  );

  /**
   * Checking for null here, as if someone was to change
   * the `inline` prop to true by default this would fail.
   */
  expect(queryByText("15")).toBeNull();
  expect(getByLabelText("Open Datepicker")).toBeInTheDocument();
});

it("returns the dates from onChange", async () => {
  const changeHandler = jest.fn();
  const { getByTestId, getByText } = render(
    <DatePicker selected={new Date()} onChange={changeHandler} />,
  );

  const button = getByTestId("calendar");
  fireEvent.click(button);

  const date = getByText("15");
  fireEvent.click(date);

  expect(changeHandler).toHaveBeenCalledWith(expect.any(Date));
});

it("allows for a custom activator to open the DatePicker", () => {
  const { getByText } = render(
    <DatePicker
      selected={new Date()}
      onChange={jest.fn()}
      activator={<div>Activate me</div>}
    />,
  );

  const button = getByText("Activate me");
  fireEvent.click(button);

  expect(getByText("15")).toBeInstanceOf(HTMLDivElement);
});

it("always appears when inline", () => {
  const { getByText } = render(
    <DatePicker selected={new Date()} onChange={jest.fn()} inline />,
  );

  expect(getByText("15")).toBeInstanceOf(HTMLDivElement);
});
