/* tslint:disable no-relative-imports */
import React from "react";
import { cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MonthlySelect } from "./MonthlySelect";
// eslint-disable-next-line
import { DurationPeriod, WeekDay } from "../../../Scheduler/types";

afterEach(cleanup);

let onChange: jest.Mock;

describe("MonthlySelect", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });

  it("should render the component", () => {
    const tree = renderer
      .create(
        <MonthlySelect
          disabled={false}
          onChange={onChange}
          selectedMonthOption={DurationPeriod.DayOfMonth}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
