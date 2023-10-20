import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CalendarDatePicker,
  CalendarDatePickerProps,
} from "./CalendarDatePicker";

function mkDate(day: number, month = 5, year = 1905) {
  return new Date(year, month - 1, day);
}

function Wrapper(props: CalendarDatePickerProps) {
  const [date, setDate] = useState<unknown>(props.selected);

  return (
    <>
      <CalendarDatePicker
        {...props}
        onChange={value => {
          setDate(value);
          // @ts-expect-error Could be a date or an array of dates
          props.onChange(value);
        }}
        // @ts-expect-error Could be a date or an array of dates
        selected={date}
      />
      <div>
        Is this the real life? Is this just fantasy?
        <button type="button">Fantasy</button>
        <button type="button">Real life</button>
      </div>
    </>
  );
}

function setup(props: CalendarDatePickerProps) {
  render(<Wrapper {...props} />);
}

it("initally displays the month of the selected date", () => {
  setup({ selected: mkDate(11), onChange: jest.fn() });
  expect(screen.getByText("May 1905")).toBeInTheDocument();
});

it("allows you to navigate to the next month", async () => {
  const user = userEvent.setup();
  setup({ selected: mkDate(11), onChange: jest.fn() });
  expect(screen.getByText("May 1905")).toBeInTheDocument();
  await user.click(screen.getByLabelText("Next month"));
  expect(screen.getByText("June 1905")).toBeInTheDocument();
});

it("allows you to navigate to the previous month", async () => {
  setup({ selected: mkDate(11), onChange: jest.fn() });
  expect(screen.getByText("May 1905")).toBeInTheDocument();
  await userEvent.click(screen.getByLabelText("Previous month"));
  expect(screen.getByText("April 1905")).toBeInTheDocument();
});

it("allows you to subscribe to navigating months", async () => {
  const onMonthChange = jest.fn();
  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    onMonthChange: onMonthChange,
  });

  expect(screen.getByText("May 1905")).toBeInTheDocument();
  await userEvent.click(screen.getByLabelText("Previous month"));
  expect(onMonthChange).toHaveBeenCalledWith(mkDate(1, 4));
  await userEvent.click(screen.getByLabelText("Next month"));
  expect(onMonthChange).toHaveBeenCalledWith(mkDate(1));
});

it("allows you to select a date", async () => {
  const onChange = jest.fn();
  setup({ selected: mkDate(11), onChange: onChange });
  await userEvent.click(screen.getByText("28"));
  expect(onChange).toHaveBeenCalledWith(mkDate(28));
});

it("dates have a role of gridcell", () => {
  setup({ selected: mkDate(11), onChange: jest.fn() });
  expect(screen.getAllByRole("gridcell")).toHaveLength(31);
});

it("allows you to select a date and subscribe to the selection", async () => {
  const onChange = jest.fn();
  setup({ selected: mkDate(11), onChange: onChange });
  await userEvent.click(screen.getByText("28"));
  expect(onChange).toHaveBeenCalledWith(mkDate(28));
});

it("allows you to specify a min date", async () => {
  const onChange = jest.fn();

  setup({
    selected: mkDate(11),
    minDate: mkDate(10),
    onChange,
  });

  await userEvent.click(screen.getByText("10"));
  expect(onChange).toHaveBeenCalledWith(mkDate(10));
  await userEvent.click(screen.getByText("9"));
  expect(onChange).not.toHaveBeenCalledWith(mkDate(9));
  await userEvent.click(screen.getByText("12"));
  expect(onChange).toHaveBeenCalledWith(mkDate(12));
});

it("allows you to specify a max date", async () => {
  const onChange = jest.fn();

  setup({
    selected: mkDate(12),
    maxDate: mkDate(13),
    onChange,
  });

  await userEvent.click(screen.getByText("13"));
  expect(onChange).toHaveBeenCalledWith(mkDate(13));
  await userEvent.click(screen.getByText("14"));
  expect(onChange).not.toHaveBeenCalledWith(mkDate(14));
  await userEvent.click(screen.getByText("11"));
  expect(onChange).toHaveBeenCalledWith(mkDate(11));
});

it("allows you to highlight dates", () => {
  setup({
    selected: mkDate(11),
    highlightedDates: [mkDate(10)],
    onChange: jest.fn(),
  });
  expect(screen.getByText("May 10, 1905, highlighted")).toBeInTheDocument();
});

it("allows you to focus on the selected date on first render", () => {
  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });
  expect(screen.getByRole("gridcell", { selected: true })).toHaveFocus();
});

it("focuses on the first date when selecting multiple and focusing on selected on first render", () => {
  setup({
    selected: [mkDate(11), mkDate(12), mkDate(13)],
    onChange: jest.fn(),
    focusonSelectedDate: true,
    multi: true,
  });

  expect(
    screen.getAllByRole("gridcell", { selected: true })[0],
  ).toHaveTextContent("May 11, 1905");

  expect(screen.getAllByRole("gridcell", { selected: true })[0]).toHaveFocus();
});

it("allows you to select multiple dates", async () => {
  const onChange = jest.fn();

  setup({
    selected: [mkDate(11)],
    onChange: onChange,
    multi: true,
  });

  await userEvent.click(screen.getByText("28"));

  expect(onChange).toHaveBeenCalledWith([mkDate(11), mkDate(28)]);
});

it("defaults to today's date as the viewing date when no date is provided", () => {
  setup({
    selected: undefined,
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  expect(screen.getAllByRole("gridcell")[today.getDate() - 1]).toHaveAttribute(
    "tabindex",
    "0",
  );
});

it("defaults to today's date as the viewing date when no dates are selected", () => {
  setup({
    selected: [],
    onChange: jest.fn(),
    multi: true,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  expect(screen.getAllByRole("gridcell")[today.getDate() - 1]).toHaveAttribute(
    "tabindex",
    "0",
  );
});

it("allows you to select a range of dates", async () => {
  const onChange = jest.fn();

  setup({
    selected: [mkDate(11)],
    onChange: onChange,
    range: true,
  });

  await userEvent.click(screen.getByText("28"));
  expect(onChange).toHaveBeenLastCalledWith([mkDate(11), mkDate(28)]);

  await userEvent.click(screen.getByText("5"));
  expect(onChange).toHaveBeenLastCalledWith([mkDate(5)]);

  await userEvent.click(screen.getByText("19"));
  expect(onChange).toHaveBeenLastCalledWith([mkDate(5), mkDate(19)]);
});

it("allows you to select a range of dates spanning months", async () => {
  const onChange = jest.fn();

  setup({
    selected: [mkDate(11)],
    onChange: onChange,
    range: true,
  });

  await userEvent.click(screen.getByLabelText("Next month"));
  await userEvent.click(screen.getByText("12"));
  expect(onChange).toHaveBeenLastCalledWith([mkDate(11), mkDate(12, 6)]);

  await userEvent.click(screen.getByText("9"));
  expect(onChange).toHaveBeenLastCalledWith([mkDate(9, 6)]);

  await userEvent.click(screen.getByLabelText("Previous month"));
  await userEvent.click(screen.getByLabelText("Previous month"));
  await userEvent.click(screen.getByText("3"));
  expect(onChange).toHaveBeenLastCalledWith([mkDate(3, 4), mkDate(9, 6)]);
});

it("supports translations", () => {
  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    highlightedDates: [mkDate(1)],
    translations: {
      chooseDate: "Kies datum",
      highlightedLabelSuffix: "gemarkeerd",
      nextMonth: "Volgende maand",
      previousMonth: "Vorige maand",
    },
  });

  expect(screen.getByLabelText("Volgende maand")).toBeInTheDocument();
  expect(screen.getByLabelText("Vorige maand")).toBeInTheDocument();
  expect(screen.getByLabelText("Kies datum")).toBeInTheDocument();
  expect(screen.getByText("May 1, 1905, gemarkeerd")).toBeInTheDocument();
});

it("allows the user to navigate to the next day using the ArrowRight key", async () => {
  const user = userEvent.setup();

  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(screen.getByRole("gridcell", { selected: true })).toHaveFocus();

  await user.keyboard("{ArrowRight}");

  expect(screen.getByRole("gridcell", { selected: true })).not.toHaveFocus();
  expect(screen.getAllByRole("gridcell")[11]).toHaveTextContent("May 12, 1905");
  expect(screen.getAllByRole("gridcell")[11]).toHaveFocus();
});
it("allows the user to navigate to the previous day using the ArrowLeft key", async () => {
  const user = userEvent.setup();

  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(screen.getByRole("gridcell", { selected: true })).toHaveFocus();

  await user.keyboard("{ArrowLeft}");

  expect(screen.getByRole("gridcell", { selected: true })).not.toHaveFocus();
  expect(screen.getAllByRole("gridcell")[9]).toHaveTextContent("May 10, 1905");
  expect(screen.getAllByRole("gridcell")[9]).toHaveFocus();
});

it("allows the user to navigate to the next week using the ArrowDown key", async () => {
  const user = userEvent.setup();

  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(screen.getByRole("gridcell", { selected: true })).toHaveFocus();

  await user.keyboard("{ArrowDown}");

  expect(screen.getByRole("gridcell", { selected: true })).not.toHaveFocus();
  expect(screen.getAllByRole("gridcell")[17]).toHaveTextContent("May 18, 1905");
  expect(screen.getAllByRole("gridcell")[17]).toHaveFocus();
});

it("allows the user to navigate to the previous week using the ArrowUp key", async () => {
  const user = userEvent.setup();

  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(screen.getByRole("gridcell", { selected: true })).toHaveFocus();

  await user.keyboard("{ArrowUp}");

  expect(screen.getByRole("gridcell", { selected: true })).not.toHaveFocus();
  expect(screen.getAllByRole("gridcell")[3]).toHaveTextContent("May 4, 1905");
  expect(screen.getAllByRole("gridcell")[3]).toHaveFocus();
});

it("allows the user to navigate to the next month using the ArrowDown key", async () => {
  const user = userEvent.setup();

  setup({
    selected: mkDate(31),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(screen.getByRole("gridcell", { selected: true })).toHaveFocus();

  await user.keyboard("{ArrowDown}");

  expect(
    screen.queryByRole("gridcell", { selected: true }),
  ).not.toBeInTheDocument();

  expect(screen.getAllByRole("gridcell")[6]).toHaveTextContent("Jun 7, 1905");
  expect(screen.getAllByRole("gridcell")[6]).toHaveFocus();
});

it("allows the user to navigate to the previous month using the ArrowUp key", async () => {
  const user = userEvent.setup();

  setup({
    selected: mkDate(3),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(screen.getByRole("gridcell", { selected: true })).toHaveFocus();

  await user.keyboard("{ArrowUp}");

  expect(
    screen.queryByRole("gridcell", { selected: true }),
  ).not.toBeInTheDocument();

  expect(screen.getAllByRole("gridcell")[25]).toHaveTextContent("Apr 26, 1905");
  expect(screen.getAllByRole("gridcell")[25]).toHaveFocus();
});

it("allows the user to navigate directly to the next month using the PageDown key", async () => {
  const user = userEvent.setup();

  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(screen.getByRole("gridcell", { selected: true })).toHaveFocus();

  await user.keyboard("{PageDown}");

  expect(
    screen.queryByRole("gridcell", { selected: true }),
  ).not.toBeInTheDocument();

  expect(screen.getAllByRole("gridcell")[10]).toHaveTextContent("Jun 11, 1905");
  expect(screen.getAllByRole("gridcell")[10]).toHaveFocus();
});

it("allows the user to navigate directly to the previous month using the PageUp key", async () => {
  const user = userEvent.setup();

  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(screen.getByRole("gridcell", { selected: true })).toHaveFocus();

  await user.keyboard("{PageUp}");

  expect(
    screen.queryByRole("gridcell", { selected: true }),
  ).not.toBeInTheDocument();
  expect(screen.getAllByRole("gridcell")[10]).toHaveTextContent("Apr 11, 1905");
  expect(screen.getAllByRole("gridcell")[10]).toHaveFocus();
});

it("allows the user to navigate directly to the next year using the Shift+PageDown key", async () => {
  const user = userEvent.setup();

  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(screen.getByRole("gridcell", { selected: true })).toHaveFocus();

  await user.keyboard("{Shift>}{PageDown}{/Shift}");

  expect(
    screen.queryByRole("gridcell", { selected: true }),
  ).not.toBeInTheDocument();

  expect(screen.getAllByRole("gridcell")[10]).toHaveTextContent("May 11, 1906");
  expect(screen.getAllByRole("gridcell")[10]).toHaveFocus();
});

it("allows the user to navigate directly to the previous year using the Shift+PageUp key", async () => {
  const user = userEvent.setup();

  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(screen.getByRole("gridcell", { selected: true })).toHaveFocus();

  await user.keyboard("{Shift>}{PageUp}{/Shift}");

  expect(
    screen.queryByRole("gridcell", { selected: true }),
  ).not.toBeInTheDocument();
  expect(screen.getAllByRole("gridcell")[10]).toHaveTextContent("May 11, 1904");
  expect(screen.getAllByRole("gridcell")[10]).toHaveFocus();
});

it("provides a onClickOutside handler", async () => {
  const onClickOutside = jest.fn();
  const user = userEvent.setup();

  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    onClickOutside,
  });

  await user.click(screen.getByText("15"));
  expect(onClickOutside).not.toHaveBeenCalled();
  await user.click(screen.getByText("Fantasy"));
  expect(onClickOutside).toHaveBeenCalled();
});
