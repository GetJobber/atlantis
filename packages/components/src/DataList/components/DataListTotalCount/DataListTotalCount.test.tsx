import React from "react";
import { render, screen, within } from "@testing-library/react";
import {
  DATALIST_TOTALCOUNT_TEST_ID,
  DataListTotalCount,
} from "./DataListTotalCount";
import { GLIMMER_TEST_ID } from "../../../Glimmer";

describe("DataListTotalCount", () => {
  it("should render the total count results", () => {
    render(<DataListTotalCount totalCount={10} loading={false} />);
    expect(screen.getByText("(10 results)")).toBeInTheDocument();
  });

  it("should render a Glimmer when loading and total count is null", () => {
    render(<DataListTotalCount totalCount={null} loading={true} />);
    const results = screen.getByTestId(DATALIST_TOTALCOUNT_TEST_ID);
    expect(within(results).getByTestId(GLIMMER_TEST_ID)).toBeInTheDocument();
  });

  it("should not render anything if the total count is not provided", () => {
    render(<DataListTotalCount />);
    expect(
      screen.queryByTestId(DATALIST_TOTALCOUNT_TEST_ID),
    ).not.toBeInTheDocument();
  });
});
