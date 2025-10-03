import React from "react";
import { render, screen, within } from "@testing-library/react";
import ReactDatePicker from "react-datepicker";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "./DatePicker";
import styles from "./DatePicker.module.css";
import {
  AtlantisContext,
  atlantisContextDefaultValues,
} from "../AtlantisContext";

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

describe("react-datepicker-ignore-onclickoutside class behavior", () => {
  const className = "react-datepicker-ignore-onclickoutside";

  it("should add className when non-inline picker is opened", async () => {
    const { container } = render(<DatePicker onChange={jest.fn()} />);
    const target = container.firstChild;

    expect(target).not.toHaveClass(className);

    jest.useRealTimers();
    await userEvent.click(screen.getByLabelText("Open Datepicker"));
    expect(target).toHaveClass(className);
  });

  it("should never have className when inline", () => {
    const { container } = render(<DatePicker onChange={jest.fn()} inline />);
    const target = container.firstChild;

    expect(target).not.toHaveClass(className);
  });

  it("should only apply className to active DatePicker", async () => {
    const { container } = render(
      <>
        <DatePicker onChange={jest.fn()} />
        <DatePicker onChange={jest.fn()} />
      </>,
    );
    const [picker1, picker2] = container.querySelectorAll(
      `.${styles.datePickerWrapper}`,
    );

    expect(picker1).not.toHaveClass(className);
    expect(picker2).not.toHaveClass(className);

    jest.useRealTimers();
    await userEvent.click(
      within(picker1 as HTMLElement).getByLabelText("Open Datepicker"),
    );

    expect(picker1).toHaveClass(className);
    expect(picker2).not.toHaveClass(className);
  });
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

describe("Week Start", () => {
  it("should default to Sunday", async () => {
    render(<DatePicker onChange={jest.fn()} />);

    jest.useRealTimers();
    await userEvent.click(screen.getByLabelText("Open Datepicker"));

    const dayNames = Array.from(
      document.querySelectorAll(
        ".react-datepicker__day-name > span[aria-hidden='true']",
      ),
    ).map(el => el.textContent);

    expect(dayNames[0]).toBe("Sun");
  });

  it("should respect the provided firstDayOfWeek value", async () => {
    render(<DatePicker onChange={jest.fn()} firstDayOfWeek={1} />);

    jest.useRealTimers();
    await userEvent.click(screen.getByLabelText("Open Datepicker"));

    const dayNames = Array.from(
      document.querySelectorAll(
        ".react-datepicker__day-name > span[aria-hidden='true']",
      ),
    ).map(el => el.textContent);

    expect(dayNames[0]).toBe("Mon");
  });

  it("should respect the firstDayOfWeek when provided in AtlantisContext", async () => {
    render(
      <AtlantisContext.Provider
        value={{ ...atlantisContextDefaultValues, firstDayOfWeek: 3 }}
      >
        <DatePicker onChange={jest.fn()} />
      </AtlantisContext.Provider>,
    );

    jest.useRealTimers();
    await userEvent.click(screen.getByLabelText("Open Datepicker"));

    const dayNames = Array.from(
      document.querySelectorAll(
        ".react-datepicker__day-name > span[aria-hidden='true']",
      ),
    ).map(el => el.textContent);

    expect(dayNames[0]).toBe("Wed");
  });

  it("should respect firstDayOfWeek in DatePicker over AtlantisContext", async () => {
    render(
      <AtlantisContext.Provider
        value={{ ...atlantisContextDefaultValues, firstDayOfWeek: 4 }}
      >
        <DatePicker onChange={jest.fn()} firstDayOfWeek={1} />
      </AtlantisContext.Provider>,
    );

    jest.useRealTimers();
    await userEvent.click(screen.getByLabelText("Open Datepicker"));

    const dayNames = Array.from(
      document.querySelectorAll(
        ".react-datepicker__day-name > span[aria-hidden='true']",
      ),
    ).map(el => el.textContent);

    expect(dayNames[0]).toBe("Mon");
  });
});
