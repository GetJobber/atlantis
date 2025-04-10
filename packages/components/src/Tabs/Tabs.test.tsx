import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

const dynamicChildren = (showCheese: boolean) => (
  <Tabs>
    <Tab label="Eggs">
      <p>🍳</p>
      <p>Eggs</p>
    </Tab>
    {showCheese && (
      <Tab label="Cheese" onClick={() => count++}>
        <p>🧀</p>
      </Tab>
    )}
    <Tab label="Berries">
      <p>🍓</p>
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

describe("Tabs Component", () => {
  describe("Rendering", () => {
    it("renders Tabs", () => {
      const { container } = render(omelet);
      expect(container).toMatchSnapshot();
    });

    it("displays the label when it is a ReactNode", () => {
      const { container } = render(omeletWithReactNodeLabel);
      expect(container).toMatchSnapshot();
    });

    describe("when children are dynamically rendered", () => {
      it("should not render a removed tab", async () => {
        const { rerender } = render(dynamicChildren(true));
        const tab = await screen.findByRole("tab", { name: "Cheese" });
        expect(tab).toBeInTheDocument();

        rerender(dynamicChildren(false));
        const oldTab = screen.queryByRole("tab", { name: "Cheese" });
        expect(oldTab).not.toBeInTheDocument();
      });

      it("should render an added tab", async () => {
        const { rerender } = render(dynamicChildren(false));
        const tab = screen.queryByRole("tab", { name: "Cheese" });
        expect(tab).not.toBeInTheDocument();

        rerender(dynamicChildren(true));
        const newTab = await screen.findByRole("tab", { name: "Cheese" });
        expect(newTab).toBeInTheDocument();
      });
    });
  });

  describe("Tab Switching", () => {
    it("should switch tabs", async () => {
      const { getByRole, queryByText } = render(omelet);

      expect(queryByText("🍳")).toBeInTheDocument();
      expect(queryByText("🧀")).not.toBeInTheDocument();

      await userEvent.click(getByRole("tab", { name: "Cheese" }));
      expect(queryByText("🍳")).not.toBeInTheDocument();
      expect(queryByText("🧀")).toBeInTheDocument();

      await userEvent.click(getByRole("tab", { name: "Eggs" }));
      expect(queryByText("🍳")).toBeInTheDocument();
      expect(queryByText("🧀")).not.toBeInTheDocument();
    });

    it("should handle tab onClick", async () => {
      const { getByRole } = render(omelet);
      count = 0;

      await userEvent.click(getByRole("tab", { name: "Cheese" }));
      expect(count).toBe(1);
      await userEvent.click(getByRole("tab", { name: "Cheese" }));
      expect(count).toBe(2);
    });

    it("should switch tabs with arrow keys", async () => {
      const { getByRole, queryByText } = render(omelet);

      const tab1 = getByRole("tab", { name: "Eggs" });
      const tab2 = getByRole("tab", { name: "Cheese" });

      await userEvent.click(tab1);
      await userEvent.keyboard("{ArrowRight}");
      expect(tab2).toHaveFocus();
      expect(queryByText("🍳")).not.toBeInTheDocument();
      expect(queryByText("🧀")).toBeInTheDocument();

      await userEvent.keyboard("{ArrowLeft}");
      expect(tab1).toHaveFocus();
      expect(queryByText("🍳")).toBeInTheDocument();
      expect(queryByText("🧀")).not.toBeInTheDocument();
    });

    it("should loop focus between tabs with arrow keys", async () => {
      const { getByRole } = render(omelet);

      const tab1 = getByRole("tab", { name: "Eggs" });
      const tab2 = getByRole("tab", { name: "Cheese" });

      await userEvent.click(tab1);
      await userEvent.keyboard("{ArrowRight}");
      expect(tab2).toHaveFocus();

      await userEvent.keyboard("{ArrowRight}");
      expect(tab1).toHaveFocus();

      await userEvent.keyboard("{ArrowLeft}");
      expect(tab2).toHaveFocus();
    });

    it("calls the onTabChange callback after a tab is clicked", async () => {
      const onTabChange = jest.fn();
      const { getByRole } = render(
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

      await userEvent.click(getByRole("tab", { name: "Cheese" }));
      expect(onTabChange).toHaveBeenCalledWith(1);
    });

    it("sets the active tab on mount", async () => {
      const { getByRole, queryByText } = render(
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

      await userEvent.click(getByRole("tab", { name: "Cheese" }));
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

    it("handles controlled activeTab prop", async () => {
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

      await userEvent.click(getByText("Set Tab 1"));
      expect(queryByText("🍳")).not.toBeInTheDocument();
      expect(queryByText("🧀")).toBeInTheDocument();

      await userEvent.click(getByText("Set Tab 0"));
      expect(queryByText("🍳")).toBeInTheDocument();
      expect(queryByText("🧀")).not.toBeInTheDocument();
    });

    describe("when children are dynamically rendered", () => {
      // eslint-disable-next-line max-statements
      it("should handle arrow key navigation with a removed tab", async () => {
        const { rerender } = render(dynamicChildren(true));

        const tab1 = screen.getByRole("tab", { name: "Eggs" });
        const tab2 = screen.getByRole("tab", { name: "Cheese" });
        const tab3 = screen.getByRole("tab", { name: "Berries" });

        await userEvent.click(tab1);
        await userEvent.keyboard("{ArrowRight}");
        expect(tab2).toHaveFocus();
        await userEvent.keyboard("{ArrowRight}");
        expect(tab3).toHaveFocus();
        await userEvent.keyboard("{ArrowRight}");
        expect(tab1).toHaveFocus();

        rerender(dynamicChildren(false));
        await userEvent.click(tab1);
        await userEvent.keyboard("{ArrowRight}");
        expect(tab3).toHaveFocus();
        await userEvent.keyboard("{ArrowRight}");
        expect(tab1).toHaveFocus();
      });

      // eslint-disable-next-line max-statements
      it("should handle arrow key navigation with an added tab", async () => {
        const { rerender } = render(dynamicChildren(false));

        const tab1 = screen.getByRole("tab", { name: "Eggs" });
        const tab3 = screen.getByRole("tab", { name: "Berries" });

        await userEvent.click(tab1);
        await userEvent.keyboard("{ArrowRight}");
        expect(tab3).toHaveFocus();

        rerender(dynamicChildren(true));
        const tab2 = screen.getByRole("tab", { name: "Cheese" });

        await userEvent.click(tab1);
        await userEvent.keyboard("{ArrowRight}");
        expect(tab2).toHaveFocus();
        await userEvent.keyboard("{ArrowRight}");
        expect(tab3).toHaveFocus();
      });
    });
  });

  describe("Focus Management", () => {
    it("will tab key focus to a child, if one exists within a tab", async () => {
      const { getByRole, getByText } = render(
        <Tabs>
          <Tab label="Eggs">
            <p>🍳</p>
            <button type="button">Focusable Child</button>
          </Tab>
          <Tab label="Cheese">
            <p>🧀</p>
          </Tab>
        </Tabs>,
      );

      const tab1 = getByRole("tab", { name: "Eggs" });
      const focusableChild = getByText("Focusable Child");

      await userEvent.click(tab1);
      await userEvent.keyboard("{Tab}");
      expect(focusableChild).toHaveFocus();
    });

    it("while focused on a child element, hitting Shift+Tab moves focus back to the tab", async () => {
      const { getByRole, getByText } = render(
        <Tabs>
          <Tab label="Eggs">
            <p>🍳</p>
            <button type="button">Focusable Child</button>
          </Tab>
          <Tab label="Cheese">
            <p>🧀</p>
          </Tab>
        </Tabs>,
      );

      const tab1 = getByRole("tab", { name: "Eggs" });
      const focusableChild = getByText("Focusable Child");

      await userEvent.click(tab1);
      await userEvent.keyboard("{Tab}");
      expect(focusableChild).toHaveFocus();

      await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
      expect(tab1).toHaveFocus();
    });
  });

  describe("Overflow Management", () => {
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

  describe("Dynamic Tabs", () => {
    function buildTabs(length: number) {
      return Array.from({ length }, (_, i) => (
        <Tab key={i} label={`Tab ${i}`}>
          <p>Content {i}</p>
        </Tab>
      ));
    }

    it("when number of tabs grows, the active tab doesn't change", async () => {
      const manyTabs = buildTabs(10);
      const { getByText, queryByText, rerender } = render(
        <Tabs>{manyTabs.map(tab => tab)}</Tabs>,
      );

      await userEvent.click(getByText("Tab 9"));
      expect(queryByText("Content 9")).toBeInTheDocument();

      const manyNewTabs = buildTabs(15);
      rerender(<Tabs>{manyNewTabs.map(tab => tab)}</Tabs>);

      expect(queryByText("Content 9")).toBeInTheDocument();
    });

    it("when number of tabs doesn't change, the active tab doesn't change", async () => {
      const manyTabs = buildTabs(10);
      const { getByText, queryByText, rerender } = render(
        <Tabs>{manyTabs.map(tab => tab)}</Tabs>,
      );

      await userEvent.click(getByText("Tab 9"));
      expect(queryByText("Content 9")).toBeInTheDocument();

      const manyNewTabs = buildTabs(10);
      rerender(<Tabs>{manyNewTabs.map(tab => tab)}</Tabs>);

      expect(queryByText("Content 9")).toBeInTheDocument();
    });

    it("when the number of tabs shrinks and defaultTab is specified, the active tab is reset to defaultTab", async () => {
      const defaultTab = 2;
      const manyTabs = buildTabs(10);
      const { getByText, queryByText, rerender } = render(
        <Tabs defaultTab={defaultTab}>{manyTabs.map(tab => tab)}</Tabs>,
      );

      await userEvent.click(getByText("Tab 9"));
      expect(queryByText("Content 9")).toBeInTheDocument();

      const manyNewTabs = buildTabs(5);
      rerender(
        <Tabs defaultTab={defaultTab}>{manyNewTabs.map(tab => tab)}</Tabs>,
      );

      expect(queryByText("Content 9")).not.toBeInTheDocument();
      expect(queryByText(`Content ${defaultTab}`)).toBeInTheDocument();
    });

    it("when the number of tabs shrinks and defaultTab is not specified, the active tab is reset to the first tab", async () => {
      const manyTabs = buildTabs(10);
      const { getByText, queryByText, rerender } = render(
        <Tabs>{manyTabs.map(tab => tab)}</Tabs>,
      );

      await userEvent.click(getByText("Tab 9"));
      expect(queryByText("Content 9")).toBeInTheDocument();

      const manyNewTabs = buildTabs(5);
      rerender(<Tabs>{manyNewTabs.map(tab => tab)}</Tabs>);

      expect(queryByText("Content 9")).not.toBeInTheDocument();
      expect(queryByText("Content 0")).toBeInTheDocument();
    });
  });
});
