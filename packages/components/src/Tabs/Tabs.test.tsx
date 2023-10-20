import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { Tab, Tabs } from ".";

afterEach(cleanup);

let count = 0;
const omelet = (
  <Tabs>
    <Tab label="Eggs">
      <p>🍳</p>
      <p>Eggs</p>
    </Tab>
    <Tab label="Cheese" onClick={() => count++}>
      <p>🧀</p>
    </Tab>
  </Tabs>
);

describe("Tabs", () => {
  it("renders Tabs", () => {
    const { container } = render(omelet);
    expect(container).toMatchSnapshot();
  });

  it("should switch tabs", () => {
    const { getByText, queryByText } = render(omelet);

    expect(queryByText("🍳")).toBeInTheDocument();
    expect(queryByText("🧀")).not.toBeInTheDocument();

    fireEvent.click(getByText("Cheese"));
    expect(queryByText("🍳")).not.toBeInTheDocument();
    expect(queryByText("🧀")).toBeInTheDocument();

    fireEvent.click(getByText("Eggs"));
    expect(queryByText("🍳")).toBeInTheDocument();
    expect(queryByText("🧀")).not.toBeInTheDocument();
  });

  it("should handle tab onClick", () => {
    const { getByText } = render(omelet);
    count = 0;

    fireEvent.click(getByText("Cheese"));
    expect(count).toBe(1);
    fireEvent.click(getByText("Cheese"));
    expect(count).toBe(2);
  });

  it("calls the onTabChange callback after a tab is clicked", () => {
    const onTabChange = jest.fn();
    const { getByText } = render(
      <Tabs onTabChange={onTabChange}>
        <Tab label="Eggs">
          <p>🍳</p>
          <p>Eggs</p>
        </Tab>
        <Tab label="Cheese">
          <p>🧀</p>
        </Tab>
      </Tabs>,
    );

    fireEvent.click(getByText("Cheese"));
    expect(onTabChange).toHaveBeenCalledWith(1);
  });

  it("sets the active tab on mount", () => {
    const { queryByText } = render(
      <Tabs defaultTab={1}>
        <Tab label="Eggs">
          <p>🍳</p>
          <p>Eggs</p>
        </Tab>
        <Tab label="Cheese">
          <p>🧀</p>
        </Tab>
      </Tabs>,
    );

    expect(queryByText("🍳")).not.toBeInTheDocument();
    expect(queryByText("🧀")).toBeInTheDocument();
  });

  it("sets the active tab to 0 if the defaultTab is out of bounds", () => {
    const { queryByText } = render(
      <Tabs defaultTab={2}>
        <Tab label="Eggs">
          <p>🍳</p>
          <p>Eggs</p>
        </Tab>
        <Tab label="Cheese">
          <p>🧀</p>
        </Tab>
      </Tabs>,
    );

    expect(queryByText("🍳")).toBeInTheDocument();
    expect(queryByText("🧀")).not.toBeInTheDocument();
  });
});
