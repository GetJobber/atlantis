import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { DayOfMonthSelect } from "./DayOfMonthSelect";
import { DayOfMonth } from "../types";

let onChange: jest.Mock;

describe("DayOfMonthSelect", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });

  it("should tigger onchange when rechecked", async () => {
    const newDayOfMonthSet = new Set<DayOfMonth>();
    newDayOfMonthSet.add(1);

    const { getByLabelText } = render(
      <DayOfMonthSelect
        disabled={false}
        onChange={onChange}
        selectedDays={newDayOfMonthSet}
      />,
    );

    fireEvent.click(getByLabelText("1"));
    expect(onChange).toHaveBeenCalledTimes(1);
    fireEvent.click(getByLabelText("1"));
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("should tigger onchange when checked", async () => {
    const newDayOfMonthSet = new Set<DayOfMonth>();

    const { getByLabelText } = render(
      <DayOfMonthSelect
        disabled={false}
        onChange={onChange}
        selectedDays={newDayOfMonthSet}
      />,
    );

    fireEvent.click(getByLabelText("1"));
    expect(onChange).toHaveBeenCalled();
  });

  it("should tigger onchange when last day", async () => {
    const newDayOfMonthSet = new Set<DayOfMonth>();
    newDayOfMonthSet.add("LAST");

    const { getByLabelText } = render(
      <DayOfMonthSelect
        disabled={false}
        onChange={onChange}
        selectedDays={newDayOfMonthSet}
      />,
    );

    fireEvent.click(getByLabelText("Last day"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
