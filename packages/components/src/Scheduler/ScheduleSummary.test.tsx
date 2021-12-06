import React from "react";
import { render } from "@testing-library/react";
import { ScheduleSummary } from "./ScheduleSummary";

describe("ScheduleSummary", () => {
  it("Should render the ScheduleSummaryComponent", () => {
    const rendered = render(
      <ScheduleSummary
        disabled={false}
        startDate={new Date(2021, 9, 1).toDateString()}
        endDate={new Date(2021, 9, 1).toDateString()}
        totalOccurences={7}
        summaryString="a test summary string"
      />,
    );

    expect(rendered).toMatchSnapshot();
  });

  it("Should render the ScheduleSummaryComponent with disabled", () => {
    const rendered = render(
      <ScheduleSummary
        disabled={true}
        startDate={new Date(2021, 9, 1).toDateString()}
        endDate={new Date(2021, 9, 1).toDateString()}
        totalOccurences={7}
        summaryString="a test summary string"
      />,
    );

    expect(rendered).toMatchSnapshot();
  });
});
