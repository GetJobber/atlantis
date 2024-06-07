import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Tab, Tabs } from ".";

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

const originalClientWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "clientWidth",
);
const originalScrollWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "scrollWidth",
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

  describe("overflow", () => {
    beforeAll(() => {
      Object.defineProperty(HTMLElement.prototype, "clientWidth", {
        configurable: true,
        value: 500,
      });
      Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
        configurable: true,
        value: 600,
      });
    });

    afterAll(() => {
      if (originalClientWidth && originalScrollWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          "clientWidth",
          originalClientWidth,
        );
        Object.defineProperty(
          HTMLElement.prototype,
          "scrollWidth",
          originalScrollWidth,
        );
      }
    });
    it("adds the overflowRight class when tabs overflow without scrolling to end", () => {
      const manyTabs = Array.from({ length: 10 }, (_, i) => (
        <Tab key={i} label={`Tab ${i}`}>
          <p>Content {i}</p>
        </Tab>
      ));

      const { container } = render(<Tabs>{manyTabs.map(tab => tab)}</Tabs>);

      expect(
        container?.firstElementChild?.firstElementChild?.classList?.contains(
          "overflowRight",
        ),
      ).toBe(true);
    });
  });
});
