import React from "react";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { DatePicker } from "./DatePicker";

afterEach(cleanup);

beforeEach(() => {
  /**
   * We need to mock our date because DatePicker sets an initial date
   * to `new Date`, we could only predict the current date for a month.
   *
   * This will mock our system time to `April 7, 2021`.
   */
  jest.useFakeTimers();
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
  await popperUpdate(() => fireEvent.click(getByTestId("calendar")));
  await popperUpdate(() => fireEvent.click(getByText("15")));

  expect(changeHandler).toHaveBeenCalledWith(expect.any(Date));
});

it("should not call onChange handler if date is disabled", async () => {
  const changeHandler = jest.fn();
  const { getByTestId, getByText } = render(
    <DatePicker
      minDate={new Date(2021, 3, 4)}
      maxDate={new Date(2021, 3, 17)}
      selected={new Date()}
      onChange={changeHandler}
    />,
  );
  await popperUpdate(() => fireEvent.click(getByTestId("calendar")));
  await popperUpdate(() => fireEvent.click(getByText("2")));
  await popperUpdate(() => fireEvent.click(getByText("21")));

  expect(changeHandler).not.toHaveBeenCalled();
});

it("allows for a custom activator to open the DatePicker", async () => {
  const { getByText } = render(
    <DatePicker
      selected={new Date()}
      onChange={jest.fn()}
      activator={<div>Activate me</div>}
    />,
  );
  await popperUpdate(() => fireEvent.click(getByText("Activate me")));

  expect(getByText("15")).toBeInstanceOf(HTMLSpanElement);
});

it("always appears when inline", () => {
  const { getByText } = render(
    <DatePicker selected={new Date()} onChange={jest.fn()} inline />,
  );

  expect(getByText("15")).toBeInstanceOf(HTMLSpanElement);
});

it("should call onMonthChange when the user switches month", async () => {
  const monthChangeHandler = jest.fn();
  const { getByTestId, getByLabelText } = render(
    <DatePicker
      selected={new Date()}
      onChange={jest.fn()}
      onMonthChange={monthChangeHandler}
    />,
  );
  await popperUpdate(() => fireEvent.click(getByTestId("calendar")));
  await popperUpdate(() => fireEvent.click(getByLabelText("Next month")));

  expect(monthChangeHandler).toHaveBeenCalledWith(expect.any(Date));
});

describe("ESC key behavior", () => {
  const handleEscape = jest.fn();
  const handleKeyDown = (e: any) => e.key === "Escape" && handleEscape();
  beforeEach(() => {
    window.addEventListener("keydown", handleKeyDown);
  });
  afterEach(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });
  it("should not trigger parent ESC listener when closed with ESC key", async () => {
    const { getByRole, queryByRole } = render(
      <div onKeyDown={handleKeyDown}>
        <DatePicker selected={new Date()} onChange={jest.fn()} />
      </div>,
    );
    // Open the picker
    const button = getByRole("button", { name: /open datepicker/i });
    fireEvent.click(button);

    const nextMonthButton = getByRole("button", { name: /next month/i });
    nextMonthButton.focus();
    // Close the picker with ESC
    fireEvent.keyDown(nextMonthButton, { key: "Escape", code: "Escape" });

    expect(
      queryByRole("button", { name: /next month/i }),
    ).not.toBeInTheDocument();
    expect(handleEscape).not.toHaveBeenCalled();
  });
});

async function popperUpdate(event: () => void) {
  event();
  // Wait for the Popper update() so jest doesn't throw an act warning
  // https://github.com/popperjs/react-popper/issues/350
  await act(async () => () => undefined);
}
