import { screen } from "@testing-library/react";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import * as POM from "./CalendarDatePicker.pom";

function mkDate(day: number, month = 5, year = 1905) {
  return new Date(year, month - 1, day);
}

it("initally displays the month of the selected date", () => {
  POM.setup({ selected: mkDate(11), onChange: jest.fn() });
  expect(screen.getByText("May 1905")).toBeInTheDocument();
});

it("allows you to navigate to the next month", async () => {
  POM.setup({ selected: mkDate(11), onChange: jest.fn() });
  expect(screen.getByText("May 1905")).toBeInTheDocument();
  await POM.iClickNextMonth();
  expect(screen.getByText("June 1905")).toBeInTheDocument();
});

it("allows you to navigate to the previous month", async () => {
  POM.setup({ selected: mkDate(11), onChange: jest.fn() });
  expect(screen.getByText("May 1905")).toBeInTheDocument();
  await POM.iClickPreviousMonth();
  expect(screen.getByText("April 1905")).toBeInTheDocument();
});

it("allows you to subscribe to navigating months", async () => {
  const onMonthChange = jest.fn();
  POM.setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    onMonthChange: onMonthChange,
  });

  expect(screen.getByText("May 1905")).toBeInTheDocument();
  await POM.iClickPreviousMonth();
  expect(onMonthChange).toHaveBeenCalledWith(mkDate(1, 4));
  await POM.iClickNextMonth();
  expect(onMonthChange).toHaveBeenCalledWith(mkDate(1));
});

it("allows you to select a date", async () => {
  const onChange = jest.fn();
  POM.setup({ selected: mkDate(11), onChange: onChange });
  await POM.iClickDay(28);
  expect(onChange).toHaveBeenCalledWith(mkDate(28));
});

it("dates have a role of gridcell", () => {
  POM.setup({ selected: mkDate(11), onChange: jest.fn() });
  expect(screen.getAllByRole("gridcell")).toHaveLength(35);
});

it("allows you to select a date and subscribe to the selection", async () => {
  const onChange = jest.fn();
  POM.setup({ selected: mkDate(11), onChange: onChange });
  await POM.iClickDay(28);
  expect(onChange).toHaveBeenCalledWith(mkDate(28));
});

it("allows you to specify a min date", async () => {
  const onChange = jest.fn();

  POM.setup({
    selected: mkDate(11),
    minDate: mkDate(10),
    onChange,
  });

  await POM.iClickDay(10);
  expect(onChange).toHaveBeenCalledWith(mkDate(10));
  await POM.iClickDay(9);
  expect(onChange).not.toHaveBeenCalledWith(mkDate(9));
  await POM.iClickDay(12);
  expect(onChange).toHaveBeenCalledWith(mkDate(12));
});

it("allows you to specify a max date", async () => {
  const onChange = jest.fn();

  POM.setup({
    selected: mkDate(12),
    maxDate: mkDate(13),
    onChange,
  });

  await POM.iClickDay(13);
  expect(onChange).toHaveBeenCalledWith(mkDate(13));
  await POM.iClickDay(14);
  expect(onChange).not.toHaveBeenCalledWith(mkDate(14));
  await POM.iClickDay(11);
  expect(onChange).toHaveBeenCalledWith(mkDate(11));
});

it("allows you to highlight dates", () => {
  POM.setup({
    selected: mkDate(11),
    highlightedDates: [mkDate(10)],
    onChange: jest.fn(),
  });
  expect(
    screen.getByText("Choose May 10, 1905, highlighted"),
  ).toBeInTheDocument();
});

it("allows you to focus on the selected date on first render", () => {
  POM.setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });
  expect(POM.getSelectedCell()).toHaveFocus();
});

it("focuses on the first date when selecting multiple and focusing on selected on first render", () => {
  POM.setup({
    selected: [mkDate(11), mkDate(12), mkDate(13)],
    onChange: jest.fn(),
    focusonSelectedDate: true,
    multi: true,
  });

  expect(
    screen.getAllByRole("gridcell", { selected: true })[0],
  ).toHaveTextContent("Choose May 11, 1905");

  expect(screen.getAllByRole("gridcell", { selected: true })[0]).toHaveFocus();
});

it("allows you to select multiple dates", async () => {
  const onChange = jest.fn();

  POM.setup({
    selected: [mkDate(11)],
    onChange: onChange,
    multi: true,
  });

  await POM.iClickDay(28);

  expect(onChange).toHaveBeenCalledWith([mkDate(11), mkDate(28)]);
});

it("defaults to today's date as the viewing date when no date is provided", async () => {
  POM.setup({
    selected: undefined,
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await POM.iPressTab();
  expect(document.activeElement).toBe(POM.getPreviousMonthButton());

  await POM.iPressTab();
  expect(document.activeElement).toBe(POM.getNextMonthButton());

  await POM.iPressTab();

  expect(
    (document.activeElement as HTMLElement | undefined)?.dataset.date,
  ).toBe(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
});

it("defaults to today's date as the viewing date when no dates are selected", () => {
  POM.setup({
    selected: [],
    onChange: jest.fn(),
    multi: true,
  });

  expect(POM.getTabbableCell()).toHaveAttribute(
    "data-date",
    POM.toDateAttributeValue(new Date()),
  );
});

it("allows you to select a range of dates", async () => {
  const onChange = jest.fn();

  POM.setup({
    selected: [mkDate(11)],
    onChange: onChange,
    range: true,
  });

  await POM.iClickDay(28);
  expect(onChange).toHaveBeenLastCalledWith([mkDate(11), mkDate(28)]);

  await POM.iClickDay(5);
  expect(onChange).toHaveBeenLastCalledWith([mkDate(5)]);

  await POM.iClickDay(19);
  expect(onChange).toHaveBeenLastCalledWith([mkDate(5), mkDate(19)]);
});

it("allows you to select a range of dates spanning months", async () => {
  const onChange = jest.fn();

  POM.setup({
    selected: [mkDate(11)],
    onChange: onChange,
    range: true,
  });

  await POM.iClickNextMonth();
  await POM.iClickDay(12);
  expect(onChange).toHaveBeenLastCalledWith([mkDate(11), mkDate(12, 6)]);

  await POM.iClickDay(9);
  expect(onChange).toHaveBeenLastCalledWith([mkDate(9, 6)]);

  await POM.iClickPreviousMonth();
  await POM.iClickPreviousMonth();
  await POM.iClickDay(3);
  expect(onChange).toHaveBeenLastCalledWith([mkDate(3, 4), mkDate(9, 6)]);
});

it("supports translations", () => {
  jest.spyOn(window.navigator, "language", "get").mockReturnValue("nl-NL");

  POM.setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    highlightedDates: [mkDate(1)],
    translations: {
      "Choose date": "Kies datum",
      highlighted: "gemarkeerd",
      "Next month": "Volgende maand",
      "Previous month": "Vorige maand",
      Choose: "Kies",
    },
  });

  expect(screen.getByLabelText("Volgende maand")).toBeInTheDocument();
  expect(screen.getByLabelText("Vorige maand")).toBeInTheDocument();
  expect(screen.getByLabelText("Kies datum")).toBeInTheDocument();
  expect(screen.getByText("Kies 1 mei 1905, gemarkeerd")).toBeInTheDocument();
});

it("allows the user to navigate to the next day using the ArrowRight key", async () => {
  POM.setup({
    selected: mkDate(15),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(POM.getSelectedCell()).toHaveFocus();

  await POM.iPressRightArrow();

  expect(POM.getCellByDate(addDays(mkDate(15), 1))).toHaveFocus();
});

it("allows the user to navigate to the previous day using the ArrowLeft key", async () => {
  POM.setup({
    selected: mkDate(15),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(POM.getSelectedCell()).toHaveFocus();

  await POM.iPressLeftArrow();

  expect(POM.getCellByDate(subDays(mkDate(15), 1))).toHaveFocus();
});

it("allows the user to navigate to the next week using the ArrowDown key", async () => {
  POM.setup({
    selected: mkDate(15),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(POM.getSelectedCell()).toHaveFocus();

  await POM.iPressDownArrow();

  expect(POM.getCellByDate(addWeeks(mkDate(15), 1))).toHaveFocus();
});

it("allows the user to navigate to the previous week using the ArrowUp key", async () => {
  POM.setup({
    selected: mkDate(15),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(POM.getSelectedCell()).toHaveFocus();

  await POM.iPressUpArrow();

  expect(POM.getCellByDate(subWeeks(mkDate(15), 1))).toHaveFocus();
});

it("allows the user to navigate to the next month using the ArrowDown key", async () => {
  POM.setup({
    selected: mkDate(31),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(POM.getSelectedCell()).toHaveFocus();

  await POM.iPressDownArrow();

  expect(POM.getCellByDate(addWeeks(mkDate(31), 1))).toHaveFocus();
});

it("allows the user to navigate to the previous month using the ArrowUp key", async () => {
  POM.setup({
    selected: mkDate(1),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(POM.getSelectedCell()).toHaveFocus();

  await POM.iPressUpArrow();

  expect(POM.getCellByDate(subWeeks(mkDate(1), 1))).toHaveFocus();
});

it("allows the user to navigate directly to the next month using the PageDown key", async () => {
  POM.setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(POM.getSelectedCell()).toHaveFocus();

  await POM.iPressPageDown();

  expect(POM.querySelectedCell()).toBeNull();

  expect(POM.getCellByDate(addMonths(mkDate(11), 1))).toHaveFocus();
});

it("allows the user to navigate directly to the previous month using the PageUp key", async () => {
  POM.setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(POM.getSelectedCell()).toHaveFocus();

  await POM.iPressPageUp();

  expect(POM.getCellByDate(subMonths(mkDate(11), 1))).toHaveFocus();
});

it("allows the user to navigate directly to the next year using the Shift+PageDown key", async () => {
  POM.setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(POM.getSelectedCell()).toHaveFocus();

  await POM.iNavigateToTheNextYearUsingTheKeyboard();

  expect(POM.querySelectedCell()).toBeNull();

  expect(POM.getCellByDate(addYears(mkDate(11), 1))).toHaveFocus();
});

it("allows the user to navigate directly to the previous year using the Shift+PageUp key", async () => {
  POM.setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    focusonSelectedDate: true,
  });

  expect(POM.getSelectedCell()).toHaveFocus();

  await POM.iNavigateToThePreviousYearUsingTheKeyboard();

  expect(POM.getCellByDate(subYears(mkDate(11), 1))).toHaveFocus();
});

it("provides a onClickOutside handler", async () => {
  const onClickOutside = jest.fn();

  POM.setup({
    selected: mkDate(11),
    onChange: jest.fn(),
    onClickOutside,
  });

  await POM.iClickDay(15);
  expect(onClickOutside).not.toHaveBeenCalled();
  await POM.iClickOutsideOfTheCalendar();
  expect(onClickOutside).toHaveBeenCalled();
});
