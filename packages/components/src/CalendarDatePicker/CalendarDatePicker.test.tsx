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
  );
}

function setup(props: CalendarDatePickerProps) {
  render(<Wrapper {...props} />);
}

it("initally displays the month of the selected date", () => {
  setup({ selected: mkDate(11), onChange: jest.fn() });
  expect(screen.getByText("May 1905")).toBeInTheDocument();
});

it("allows you to navigate to the next month", () => {
  setup({ selected: mkDate(11), onChange: jest.fn() });
  expect(screen.getByText("May 1905")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("Next month"));
  expect(screen.getByText("June 1905")).toBeInTheDocument();
});

it("allows you to navigate to the previous month", () => {
  setup({ selected: mkDate(11), onChange: jest.fn() });
  expect(screen.getByText("May 1905")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("Previous month"));
  expect(screen.getByText("April 1905")).toBeInTheDocument();
});

it("allows you to subscribe to navigating months", () => {
  const onMonthChange = jest.fn();
  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    onMonthChange: onMonthChange,
  });

  expect(screen.getByText("May 1905")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("Previous month"));
  expect(onMonthChange).toHaveBeenCalledWith(mkDate(1, 4));
  userEvent.click(screen.getByLabelText("Next month"));
  expect(onMonthChange).toHaveBeenCalledWith(mkDate(1));
});

it("allows you to select a date", () => {
  const onChange = jest.fn();
  setup({ selected: mkDate(11), onChange: onChange });
  userEvent.click(screen.getByText("28"));
  expect(onChange).toHaveBeenCalledWith(mkDate(28));
});

it("dates have a role of gridcell", () => {
  setup({ selected: mkDate(11), onChange: jest.fn() });
  expect(screen.getAllByRole("gridcell")).toHaveLength(31);
});

it("allows you to select a date and subscribe to the selection", () => {
  const onChange = jest.fn();
  setup({ selected: mkDate(11), onChange: onChange });
  userEvent.click(screen.getByText("28"));
  expect(onChange).toHaveBeenCalledWith(mkDate(28));
});

it("allows you to specify a min date", () => {
  const onChange = jest.fn();

  setup({
    selected: mkDate(11),
    minDate: mkDate(10),
    onChange,
  });

  userEvent.click(screen.getByText("10"));
  expect(onChange).toHaveBeenCalledWith(mkDate(10));
  userEvent.click(screen.getByText("9"));
  expect(onChange).not.toHaveBeenCalledWith(mkDate(9));
  userEvent.click(screen.getByText("12"));
  expect(onChange).toHaveBeenCalledWith(mkDate(12));
});

it("allows you to specify a max date", () => {
  const onChange = jest.fn();

  setup({
    selected: mkDate(12),
    maxDate: mkDate(13),
    onChange,
  });

  userEvent.click(screen.getByText("13"));
  expect(onChange).toHaveBeenCalledWith(mkDate(13));
  userEvent.click(screen.getByText("14"));
  expect(onChange).not.toHaveBeenCalledWith(mkDate(14));
  userEvent.click(screen.getByText("11"));
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

it("allows you to focus on the selected date", () => {
  setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });
  expect(screen.getByRole("gridcell", { selected: true })).toHaveFocus();
});

it("allows you to select multiple dates", () => {
  const onChange = jest.fn(function onChange(dates) {
    console.log(dates);
  });

  setup({
    selected: [mkDate(11)],
    onChange: onChange,
    multi: true,
  });

  userEvent.click(screen.getByText("28"));

  expect(onChange).toHaveBeenCalledWith([mkDate(11), mkDate(28)]);
});

it("allows you to select a range of dates", () => {
  const onChange = jest.fn();

  setup({
    selected: [mkDate(11)],
    onChange: onChange,
    range: true,
  });

  userEvent.click(screen.getByText("28"));
  expect(onChange).toHaveBeenLastCalledWith([mkDate(11), mkDate(28)]);

  userEvent.click(screen.getByText("5"));
  expect(onChange).toHaveBeenLastCalledWith([mkDate(5)]);

  userEvent.click(screen.getByText("19"));
  expect(onChange).toHaveBeenLastCalledWith([mkDate(5), mkDate(19)]);
});

it("allows you to select a range of dates spanning months", () => {
  const onChange = jest.fn();

  setup({
    selected: [mkDate(11)],
    onChange: onChange,
    range: true,
  });

  userEvent.click(screen.getByLabelText("Next month"));
  userEvent.click(screen.getByText("12"));
  expect(onChange).toHaveBeenLastCalledWith([mkDate(11), mkDate(12, 6)]);

  userEvent.click(screen.getByText("9"));
  expect(onChange).toHaveBeenLastCalledWith([mkDate(9, 6)]);

  userEvent.click(screen.getByLabelText("Previous month"));
  userEvent.click(screen.getByLabelText("Previous month"));
  userEvent.click(screen.getByText("3"));
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
