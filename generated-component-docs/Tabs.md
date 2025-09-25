# Tabs

# Tabs

Tabs are used to alternate amongst related views within the same context.

## Design & usage guidelines

Use Tabs when you need to group related sub-groups of content and the user only
needs to access one sub-group at a time.

Do not use Tabs as a means of navigating the view or in lieu of a Table of
Contents.

## Content guidelines

Tabs are a metaphor for physical tab folders, so think of the content of each
Tab as its' own "sheet of paper". What the content is can be flexible, as long
as each Tab has distinct content.

Tab labels contain only text by default, but additional content can be added if
needed. Typically this should be some metadata that helps the user understand or
anticipate the contents of each Tab, such as an InlineLabel to badge a count of
items in each Tab, or an Icon. Do not insert additional interactive elements
such as Buttons into a Tab label as it will create a confusing interaction
pattern for the user.

## Related components

To show multiple groupings of content at once, use [Card](/components/Card).

To allow the user to select one-of-many options in a form, use
[RadioGroup](/components/RadioGroup) or [Select](/components/Select).

## Accessibility

Tabs have known accessibility concerns, including:

- the user cannot navigate between Tabs using the arrow keys
  - this breaks a universal expectation for tabbed interfaces
- the user cannot keyboard-navigate directly from the selected Tab into the
  selected Tab content
  - initial keypress of `tab` key or `command+option+right` focuses next Tab

## Web Component Code

```tsx
Tabs Segmented Control Web React import type { ReactElement, ReactNode } from "react";
import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./Tabs.module.css";
import { useTabsOverflow } from "./hooks/useTabsOverflow";
import { useArrowKeyNavigation } from "./hooks/useArrowKeyNavigation";
import { Typography } from "../Typography";

interface TabsProps {
  readonly children:
    | ReactElement
    | Array<ReactElement | null | undefined | boolean>;

  /**
   * Specifies the index of the tab that should be active on mount
   *
   * @default 0
   */
  readonly defaultTab?: number;

  /**
   * Specifies the index of the active tab.
   * If provided, the component will be controlled and the active tab will be determined by this prop.
   * If not provided, the component will manage its own state internally.
   */
  readonly activeTab?: number;

  /**
   * Callback that fires when the active tab changes
   * @param newTabIndex
   */
  onTabChange?(newTabIndex: number): void;
}

export function Tabs({
  children,
  defaultTab = 0,
  activeTab: controlledActiveTab,
  onTabChange,
}: TabsProps) {
  const tabChildren = getActiveTabs(children);

  const activeTabInitialValue =
    defaultTab < tabChildren.length ? defaultTab : 0;
  const [internalActiveTab, setInternalActiveTab] = useState(
    activeTabInitialValue,
  );
  const activeTab =
    controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const { overflowRight, overflowLeft, tabRow } = useTabsOverflow();
  const overflowClassNames = classnames(styles.overflow, {
    [styles.overflowRight]: overflowRight,
    [styles.overflowLeft]: overflowLeft,
  });

  const tabRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

  const activateTab = (index: number) => {
    return () => {
      if (controlledActiveTab === undefined) {
        setInternalActiveTab(index);
      }

      if (onTabChange) {
        onTabChange(index);
      }
    };
  };

  const handleKeyDown = useArrowKeyNavigation({
    elementsRef: tabRefs,
    onActivate: index => activateTab(index)(),
  });

  const activeTabProps = tabChildren[activeTab]?.props;

  useEffect(() => {
    if (activeTab > tabChildren.length - 1) {
      setInternalActiveTab(activeTabInitialValue);
    }
  }, [tabChildren.length]);

  return (
    <div className={styles.tabs}>
      <div className={overflowClassNames}>
        <ul
          role="tablist"
          className={styles.tabRow}
          ref={tabRow}
          onKeyDown={handleKeyDown}
        >
          {React.Children.map(children, child => {
            if (!isChildTab(child)) {
              return child;
            }

            const index = tabChildren.findIndex(
              tab => tab.props.label === child.props.label,
            );

            return (
              <InternalTab
                label={child.props.label}
                selected={activeTab === index}
                activateTab={activateTab(index)}
                onClick={child.props.onClick}
                ref={el => {
                  if (el) {
                    tabRefs.current.set(index, el);
                  } else {
                    tabRefs.current.delete(index);
                  }
                }}
                tabIndex={activeTab === index ? 0 : -1}
              />
            );
          })}
        </ul>
      </div>
      <section
        role="tabpanel"
        className={styles.tabContent}
        aria-label={activeTabProps?.label}
      >
        {activeTabProps?.children}
      </section>
    </div>
  );
}

interface TabProps {
  readonly label: string | ReactNode;
  readonly children: ReactNode | ReactNode[];

  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export function Tab({ label }: TabProps) {
  return <>{label}</>;
}

interface InternalTabProps {
  readonly label: string | ReactNode;
  readonly selected: boolean;
  activateTab(): void;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  readonly tabIndex: number;
}

const InternalTab = React.forwardRef<HTMLButtonElement, InternalTabProps>(
  ({ label, selected, activateTab, onClick, tabIndex }, ref) => {
    const className = classnames(styles.tab, { [styles.selected]: selected });

    return (
      <li role="presentation">
        <button
          type="button"
          role="tab"
          className={className}
          onClick={event => {
            activateTab();
            onClick?.(event);
          }}
          ref={ref}
          tabIndex={tabIndex}
        >
          {typeof label === "string" ? (
            <Typography element="span" size="large" fontWeight="semiBold">
              {label}
            </Typography>
          ) : (
            label
          )}
        </button>
      </li>
    );
  },
);

InternalTab.displayName = "InternalTab";

function getActiveTabs(children: TabsProps["children"]) {
  const activeTabChildren: ReactElement[] = [];

  React.Children.toArray(children).forEach(child => {
    if (isChildTab(child)) {
      activeTabChildren.push(child);
    }
  });

  return activeTabChildren;
}

function isChildTab(
  child: ReactNode,
): child is ReactElement<TabProps, typeof Tab> {
  return React.isValidElement(child) && child.type === Tab;
}

export { InternalTab };

```

## Props

### Web Props

| Prop         | Type     | Required | Default           | Description                                                   |
| ------------ | -------- | -------- | ----------------- | ------------------------------------------------------------- |
| `defaultTab` | `number` | ❌       | `[object Object]` | Specifies the index of the tab that should be active on mount |
| `activeTab`  | `number` | ❌       | `_none_`          | Specifies the index of the active tab.                        |

If provided, the component will be controlled and the active tab will be
determined by this prop. If not provided, the component will manage its own
state internally. | | `onTabChange` | `(newTabIndex: number) => void` | ❌ |
`_none_` | Callback that fires when the active tab changes @param newTabIndex |

## Categories

- Navigation

## Web Test Code

```typescript
Tabs Segmented Control Web React Test Testing Jest import React from "react";
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
        const tab = screen.getByRole("tab", { name: "Cheese" });
        expect(tab).toBeVisible();

        rerender(dynamicChildren(false));
        const oldTab = screen.queryByRole("tab", { name: "Cheese" });
        expect(oldTab).not.toBeInTheDocument();
      });

      it("should render an added tab", async () => {
        const { rerender } = render(dynamicChildren(false));
        const tab = screen.queryByRole("tab", { name: "Cheese" });
        expect(tab).not.toBeInTheDocument();

        rerender(dynamicChildren(true));
        const newTab = screen.getByRole("tab", { name: "Cheese" });
        expect(newTab).toBeVisible();
      });
    });
  });

  describe("Tab Switching", () => {
    it("should switch tabs", async () => {
      render(omelet);

      expect(screen.getByText("🍳")).toBeVisible();
      expect(screen.queryByText("🧀")).not.toBeInTheDocument();

      await userEvent.click(screen.getByRole("tab", { name: "Cheese" }));
      expect(screen.queryByText("🍳")).not.toBeInTheDocument();
      expect(screen.getByText("🧀")).toBeVisible();

      await userEvent.click(screen.getByRole("tab", { name: "Eggs" }));
      expect(screen.getByText("🍳")).toBeVisible();
      expect(screen.queryByText("🧀")).not.toBeInTheDocument();
    });

    it("should handle tab onClick", async () => {
      render(omelet);
      count = 0;

      await userEvent.click(screen.getByRole("tab", { name: "Cheese" }));
      expect(count).toBe(1);
      await userEvent.click(screen.getByRole("tab", { name: "Cheese" }));
      expect(count).toBe(2);
    });

    it("should switch tabs with arrow keys", async () => {
      render(omelet);

      const tab1 = screen.getByRole("tab", { name: "Eggs" });
      const tab2 = screen.getByRole("tab", { name: "Cheese" });

      await userEvent.click(tab1);
      await userEvent.keyboard("{ArrowRight}");
      expect(tab2).toHaveFocus();
      expect(screen.queryByText("🍳")).not.toBeInTheDocument();
      expect(screen.getByText("🧀")).toBeVisible();

      await userEvent.keyboard("{ArrowLeft}");
      expect(tab1).toHaveFocus();
      expect(screen.getByText("🍳")).toBeVisible();
      expect(screen.queryByText("🧀")).not.toBeInTheDocument();
    });

    it("should loop focus between tabs with arrow keys", async () => {
      render(omelet);

      const tab1 = screen.getByRole("tab", { name: "Eggs" });
      const tab2 = screen.getByRole("tab", { name: "Cheese" });

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
      render(
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

      await userEvent.click(screen.getByRole("tab", { name: "Cheese" }));
      expect(onTabChange).toHaveBeenCalledWith(1);
    });

    it("sets the active tab on mount", async () => {
      render(
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

      await userEvent.click(screen.getByRole("tab", { name: "Cheese" }));
      expect(screen.queryByText("🍳")).not.toBeInTheDocument();
      expect(screen.getByText("🧀")).toBeVisible();
    });

    it("sets the active tab to 0 if the defaultTab is out of bounds", () => {
      render(
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

      expect(screen.getByText("🍳")).toBeVisible();
      expect(screen.queryByText("🧀")).not.toBeInTheDocument();
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

      render(<ControlledTabs />);

      expect(screen.getByText("🍳")).toBeVisible();
      expect(screen.queryByText("🧀")).not.toBeInTheDocument();

      await userEvent.click(screen.getByText("Set Tab 1"));
      expect(screen.queryByText("🍳")).not.toBeInTheDocument();
      expect(screen.getByText("🧀")).toBeVisible();

      await userEvent.click(screen.getByText("Set Tab 0"));
      expect(screen.getByText("🍳")).toBeVisible();
      expect(screen.queryByText("🧀")).not.toBeInTheDocument();
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
      render(
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

      const tab1 = screen.getByRole("tab", { name: "Eggs" });
      const focusableChild = screen.getByText("Focusable Child");

      await userEvent.click(tab1);
      await userEvent.keyboard("{Tab}");
      expect(focusableChild).toHaveFocus();
    });

    it("while focused on a child element, hitting Shift+Tab moves focus back to the tab", async () => {
      render(
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

      const tab1 = screen.getByRole("tab", { name: "Eggs" });
      const focusableChild = screen.getByText("Focusable Child");

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
      const { rerender } = render(<Tabs>{manyTabs.map(tab => tab)}</Tabs>);

      await userEvent.click(screen.getByText("Tab 9"));
      expect(screen.getByText("Content 9")).toBeVisible();

      const manyNewTabs = buildTabs(15);
      rerender(<Tabs>{manyNewTabs.map(tab => tab)}</Tabs>);

      expect(screen.getByText("Content 9")).toBeVisible();
    });

    it("when number of tabs doesn't change, the active tab doesn't change", async () => {
      const manyTabs = buildTabs(10);
      const { rerender } = render(<Tabs>{manyTabs.map(tab => tab)}</Tabs>);

      await userEvent.click(screen.getByText("Tab 9"));
      expect(screen.getByText("Content 9")).toBeVisible();

      const manyNewTabs = buildTabs(10);
      rerender(<Tabs>{manyNewTabs.map(tab => tab)}</Tabs>);

      expect(screen.getByText("Content 9")).toBeVisible();
    });

    it("when the number of tabs shrinks and defaultTab is specified, the active tab is reset to defaultTab", async () => {
      const defaultTab = 2;
      const manyTabs = buildTabs(10);
      const { rerender } = render(
        <Tabs defaultTab={defaultTab}>{manyTabs.map(tab => tab)}</Tabs>,
      );

      await userEvent.click(screen.getByText("Tab 9"));
      expect(screen.getByText("Content 9")).toBeVisible();

      const manyNewTabs = buildTabs(5);
      rerender(
        <Tabs defaultTab={defaultTab}>{manyNewTabs.map(tab => tab)}</Tabs>,
      );

      expect(screen.queryByText("Content 9")).not.toBeInTheDocument();
      expect(screen.getByText(`Content ${defaultTab}`)).toBeVisible();
    });

    it("when the number of tabs shrinks and defaultTab is not specified, the active tab is reset to the first tab", async () => {
      const manyTabs = buildTabs(10);
      const { rerender } = render(<Tabs>{manyTabs.map(tab => tab)}</Tabs>);

      await userEvent.click(screen.getByText("Tab 9"));
      expect(screen.getByText("Content 9")).toBeVisible();

      const manyNewTabs = buildTabs(5);
      rerender(<Tabs>{manyNewTabs.map(tab => tab)}</Tabs>);

      expect(screen.queryByText("Content 9")).not.toBeInTheDocument();
      expect(screen.getByText("Content 0")).toBeVisible();
    });
  });
});

```

## Component Path

`/components/Tabs`

---

_Generated on 2025-08-21T17:35:16.372Z_
