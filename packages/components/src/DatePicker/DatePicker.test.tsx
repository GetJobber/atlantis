import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ReactDatePicker from "react-datepicker";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "./DatePicker";

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
  render(<DatePicker selected={new Date()} onChange={jest.fn()} />);

  /**
   * Checking for null here, as if someone was to change
   * the `inline` prop to true by default this would fail.
   */
  expect(screen.queryByText("15")).toBeNull();
  expect(screen.getByLabelText("Open Datepicker")).toBeInTheDocument();
});

it("returns the dates from onChange", async () => {
  const changeHandler = jest.fn();
  render(<DatePicker selected={new Date()} onChange={changeHandler} />);

  jest.useRealTimers();
  await userEvent.click(screen.getByLabelText("Open Datepicker"));
  await userEvent.click(screen.getByText("15"));

  expect(changeHandler).toHaveBeenCalledWith(expect.any(Date));
});

it("should not call onChange handler if date is disabled", async () => {
  const changeHandler = jest.fn();
  render(
    <DatePicker
      minDate={new Date(2021, 3, 4)}
      maxDate={new Date(2021, 3, 17)}
      selected={new Date()}
      onChange={changeHandler}
    />,
  );

  jest.useRealTimers();
  await userEvent.click(screen.getByLabelText("Open Datepicker"));
  await userEvent.click(screen.getByText("2"));
  await userEvent.click(screen.getByText("21"));

  expect(changeHandler).not.toHaveBeenCalled();
});

it("allows for a custom activator to open the DatePicker", async () => {
  render(
    <DatePicker
      selected={new Date()}
      onChange={jest.fn()}
      activator={<div>Activate me</div>}
    />,
  );
  jest.useRealTimers();
  await userEvent.click(screen.getByText("Activate me"));

  expect(screen.getByText("15")).toBeInstanceOf(HTMLDivElement);
});

it("always appears when inline", () => {
  render(<DatePicker selected={new Date()} onChange={jest.fn()} inline />);

  expect(screen.getByText("15")).toBeInstanceOf(HTMLDivElement);
});

it("should not add the `react-datepicker-ignore-onclickoutside` when inline", () => {
  const { container, rerender } = render(<DatePicker onChange={jest.fn()} />);

  const target = container.firstChild;
  const className = "react-datepicker-ignore-onclickoutside";
  expect(target).toHaveClass(className);

  rerender(<DatePicker onChange={jest.fn()} inline />);

  expect(target).not.toHaveClass(className);
});

it("should call onMonthChange when the user switches month", async () => {
  const monthChangeHandler = jest.fn();
  render(
    <DatePicker
      selected={new Date()}
      onChange={jest.fn()}
      onMonthChange={monthChangeHandler}
    />,
  );

  jest.useRealTimers();
  await userEvent.click(screen.getByLabelText("Open Datepicker"));
  await userEvent.click(screen.getByLabelText("Next Month"));

  expect(monthChangeHandler).toHaveBeenCalledWith(expect.any(Date));
});

describe("ESC key behavior", () => {
  const handleEscape = jest.fn();
  const handleKeyDown = (e: { key: string }) =>
    e.key === "Escape" && handleEscape();
  beforeEach(() => {
    window.addEventListener("keydown", handleKeyDown);
  });
  afterEach(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });
  it("should not trigger parent ESC listener when closed with ESC key", async () => {
    render(
      <div onKeyDown={handleKeyDown}>
        <DatePicker selected={new Date()} onChange={jest.fn()} />
      </div>,
    );
    // Open the picker
    const button = screen.getByRole("button", { name: /open datepicker/i });
    jest.useRealTimers();
    await userEvent.click(button);

    // Close the picker with ESC
    await userEvent.keyboard("{Escape}");

    expect(
      screen.queryByRole("button", { name: /next month/i }),
    ).not.toBeInTheDocument();
    expect(handleEscape).not.toHaveBeenCalled();
  });
});

describe("Ensure ReactDatePicker CSS class names exists", () => {
  it("should have the click outside class", async () => {
    render(<ReactDatePicker onChange={jest.fn} />);
    jest.useRealTimers();

    const input = screen.getByRole("textbox");
    const className = "react-datepicker-ignore-onclickoutside";

    expect(input).not.toHaveClass(className);
    await userEvent.tab();
    expect(input).toHaveClass(className);
  });

  describe("Overwritten CSS class name", () => {
    const classNames = [
      ".react-datepicker",
      ".react-datepicker__input-container",
      ".react-datepicker-wrapper",
      ".react-datepicker-popper",
      ".react-datepicker__header",
      ".react-datepicker__month",
      ".react-datepicker__day",
      ".react-datepicker__day--outside-month",
      ".react-datepicker__day--selected",
      ".react-datepicker__day-names",
      ".react-datepicker__day-name",
      ".react-datepicker__day--disabled",
    ];

    classNames.forEach(className => {
      it(`should have ${className}`, async () => {
        const { container } = render(
          <ReactDatePicker
            minDate={new Date(2021, 3, 4)}
            maxDate={new Date(2021, 3, 27)}
            selected={new Date()}
            onChange={jest.fn}
          />,
        );
        jest.useRealTimers();
        await userEvent.tab();
        expect(container.querySelector(className)).toBeTruthy();
      });
    });
  });
});

describe("Multiple DatePicker instances", () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  it("should close other open DatePickers when one is opened", async () => {
    const { container } = render(
      <>
        <DatePicker onChange={jest.fn()} />
        <DatePicker onChange={jest.fn()} />
      </>,
    );

    const [picker1, picker2] = screen.getAllByRole("button", {
      name: /open datepicker/i,
    });

    // Open first picker
    await userEvent.click(picker1);
    await waitFor(() => {
      const calendar = container.querySelector(".react-datepicker");
      expect(calendar).toBeInTheDocument();
      expect(calendar?.closest(".datePickerWrapper")).toBe(
        picker1.closest(".datePickerWrapper"),
      );
    });

    // Open second picker
    await userEvent.click(picker2);
    await waitFor(() => {
      // Verify only one calendar exists and it belongs to picker2
      const calendars = container.querySelectorAll(".react-datepicker");
      expect(calendars).toHaveLength(1);
      expect(calendars[0].closest(".datePickerWrapper")).toBe(
        picker2.closest(".datePickerWrapper"),
      );

      expect(
        picker1
          .closest(".datePickerWrapper")
          ?.querySelector(".react-datepicker"),
      ).toBeNull();
    });
  });
});
