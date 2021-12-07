/* tslint:disable no-relative-imports */
import React from "react";
import { cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { WeeklySelect } from "./WeeklySelect";
// eslint-disable-next-line
import { DurationPeriod, WeekDay } from "../../../Scheduler/types";

afterEach(cleanup);

let onChange: jest.Mock;

describe("WeeklySelect", () => {
  beforeEach(() => {
    onChange = jest.fn();
  });

  it("should render the component", () => {
    const tree = renderer
      .create(
        <WeeklySelect
          disabled={false}
          onChange={onChange}
          selectedDays={new Set<WeekDay>()}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
