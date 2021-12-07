import React from "react";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { DayOfMonthSelect } from "./DayOfMonthSelect";
import { DayOfMonth } from "../../types";

afterEach(cleanup);

let onChange: jest.Mock;

describe("DayOfMonthSelect", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });
  it("should render the component", () => {
    let tree;
    act(() => {
      tree = renderer
        .create(
          <DayOfMonthSelect
            disabled={false}
            onChange={onChange}
            selectedDays={new Set<DayOfMonth>()}
          />,
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
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
