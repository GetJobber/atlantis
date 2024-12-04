import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { InlineLabel } from "@jobber/components/InlineLabel";
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

const omeletWithReactNodeLabel = (
  <Tabs>
    <Tab label={<InlineLabel color="red">{"Bacon"}</InlineLabel>}>
      <p>Eggs</p>
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

  it("displays the label when it is a ReactNode", () => {
    const { container } = render(omeletWithReactNodeLabel);
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

  it("handles controlled activeTab prop", () => {
    const ControlledTabs = () => {
      const [activeTab, setActiveTab] = React.useState(0);

      return (
        <div>
          <button type="button" onClick={() => setActiveTab(0)}>
            Set Tab 0
          </button>
          <button type="button" onClick={() => setActiveTab(1)}>
            Set Tab 1
          </button>
          <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
            <Tab label="Eggs">
              <p>🍳</p>
            </Tab>
            <Tab label="Cheese">
              <p>🧀</p>
            </Tab>
          </Tabs>
        </div>
      );
    };

    const { getByText, queryByText } = render(<ControlledTabs />);

    expect(queryByText("🍳")).toBeInTheDocument();
    expect(queryByText("🧀")).not.toBeInTheDocument();

    fireEvent.click(getByText("Set Tab 1"));
    expect(queryByText("🍳")).not.toBeInTheDocument();
    expect(queryByText("🧀")).toBeInTheDocument();

    fireEvent.click(getByText("Set Tab 0"));
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

  describe("dynamic tabs", () => {
    function buildTabs(length: number) {
      return Array.from({ length }, (_, i) => (
        <Tab key={i} label={`Tab ${i}`}>
          <p>Content {i}</p>
        </Tab>
      ));
    }

    it("when number of tabs grows, the active tab doesn't change", () => {
      const manyTabs = buildTabs(10);
      const { getByText, queryByText, rerender } = render(
        <Tabs>{manyTabs.map(tab => tab)}</Tabs>,
      );

      fireEvent.click(getByText("Tab 9"));
      expect(queryByText("Content 9")).toBeInTheDocument();

      const manyNewTabs = buildTabs(15);
      rerender(<Tabs>{manyNewTabs.map(tab => tab)}</Tabs>);

      expect(queryByText("Content 9")).toBeInTheDocument();
    });

    it("when number of tabs doesn't change, the active tab doesn't change", () => {
      const manyTabs = buildTabs(10);
      const { getByText, queryByText, rerender } = render(
        <Tabs>{manyTabs.map(tab => tab)}</Tabs>,
      );

      fireEvent.click(getByText("Tab 9"));
      expect(queryByText("Content 9")).toBeInTheDocument();

      const manyNewTabs = buildTabs(10);
      rerender(<Tabs>{manyNewTabs.map(tab => tab)}</Tabs>);

      expect(queryByText("Content 9")).toBeInTheDocument();
    });

    it("when the number of tabs shrinks and defaultTab is specified, the active tab is reset to defaultTab", () => {
      const defaultTab = 2;
      const manyTabs = buildTabs(10);
      const { getByText, queryByText, rerender } = render(
        <Tabs defaultTab={defaultTab}>{manyTabs.map(tab => tab)}</Tabs>,
      );

      fireEvent.click(getByText("Tab 9"));
      expect(queryByText("Content 9")).toBeInTheDocument();

      const manyNewTabs = buildTabs(5);
      rerender(
        <Tabs defaultTab={defaultTab}>{manyNewTabs.map(tab => tab)}</Tabs>,
      );

      expect(queryByText("Content 9")).not.toBeInTheDocument();
      expect(queryByText(`Content ${defaultTab}`)).toBeInTheDocument();
    });

    it("when the number of tabs shrinks and defaultTab is not specified, the active tab is reset to the first tab", () => {
      const manyTabs = buildTabs(10);
      const { getByText, queryByText, rerender } = render(
        <Tabs>{manyTabs.map(tab => tab)}</Tabs>,
      );

      fireEvent.click(getByText("Tab 9"));
      expect(queryByText("Content 9")).toBeInTheDocument();

      const manyNewTabs = buildTabs(5);
      rerender(<Tabs>{manyNewTabs.map(tab => tab)}</Tabs>);

      expect(queryByText("Content 9")).not.toBeInTheDocument();
      expect(queryByText("Content 0")).toBeInTheDocument();
    });
  });
});
