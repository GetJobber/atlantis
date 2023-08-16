import React from "react";
import { render, screen } from "@testing-library/react";
import { DataList } from "./DataList";
import { GLIMMER_TEST_ID } from "../Glimmer";

describe("DataList", () => {
  it("should render a title when it's provided", () => {
    render(<DataList loading={false} title="All Clients" />);

    expect(screen.getByText("All Clients")).toBeInTheDocument();
  });

  it("should render the total count if the title and showCount prop is provided", () => {
    render(
      <DataList
        loading={false}
        title="All Clients"
        showCount={true}
        totalCount={10}
      />,
    );

    expect(screen.getByText("All Clients")).toBeInTheDocument();
    expect(screen.getByText("(10 results)")).toBeInTheDocument();
  });

  it("should not render the total count if the showCount prop is false", () => {
    render(
      <DataList
        loading={false}
        title="All Clients"
        totalCount={10}
        showCount={false}
      />,
    );

    expect(screen.getByText("All Clients")).toBeInTheDocument();
    expect(screen.queryByText("(10 results)")).toBeNull();
  });

  it("should render the Glimmer when loading", () => {
    render(<DataList loading={true} title="All Clients" />);

    expect(screen.getByTestId(GLIMMER_TEST_ID)).toBeInTheDocument();
  });
});
