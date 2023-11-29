import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { MonthlyDayOfWeekSelect } from "./MonthlyDayOfWeekSelect";
import { WeekDay } from "../types";

let onChange: jest.Mock;

describe("MonthlyDayOfWeekSelect", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });

  describe("MonthlyDayOfWeekSelect with a monthly reccurrence", () => {
    beforeEach(() => {
      onChange = jest.fn();
    });

    it("should render the days of weeks for the month", () => {
      const { queryAllByText } = render(
        <MonthlyDayOfWeekSelect
          disabled={false}
          onChange={onChange}
          selectedWeeks={[
            new Set<WeekDay>(),
            new Set<WeekDay>(),
            new Set<WeekDay>(),
            new Set<WeekDay>(),
          ]}
        />,
      );

      expect(queryAllByText(/M/)).toHaveLength(4);
      expect(queryAllByText(/T/)).toHaveLength(8);
      expect(queryAllByText(/W/)).toHaveLength(4);
      expect(queryAllByText(/F/)).toHaveLength(4);
      expect(queryAllByText(/S/)).toHaveLength(8);
    });

    it("should call onChange when a day is selected", () => {
      const { getAllByLabelText } = render(
        <MonthlyDayOfWeekSelect
          disabled={false}
          onChange={onChange}
          selectedWeeks={[
            new Set<WeekDay>(),
            new Set<WeekDay>(),
            new Set<WeekDay>(),
            new Set<WeekDay>(),
          ]}
        />,
      );

      fireEvent.click(getAllByLabelText(/M/i)[0]);
      expect(onChange).toHaveBeenCalled();
    });
  });
});
