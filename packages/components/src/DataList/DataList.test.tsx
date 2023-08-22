import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { DataListLayoutProps } from "./components/DataListLayout";
import { DataList } from "./DataList";
import {
  BREAKPOINTS,
  Breakpoints,
  EMPTY_FILTER_RESULTS_ACTION_LABEL,
  EMPTY_FILTER_RESULTS_MESSAGE,
} from "./DataList.const";
import {
  DataListItemType,
  DataListObject,
  DataListProps,
} from "./DataList.types";
import { DATALIST_TOTALCOUNT_TEST_ID } from "./components/DataListTotalCount";
import { GLIMMER_TEST_ID } from "../Glimmer";

describe("DataList", () => {
  describe("Title and results counter", () => {
    it("should render the total count", () => {
      render(
        <DataList
          loading={false}
          totalCount={10}
          data={[{ label: "Luke Skywalker" }]}
          headers={{
            label: "Name",
          }}
        >
          <></>
        </DataList>,
      );
      expect(screen.getByText("(10 results)")).toBeInTheDocument();
    });

    it("should not render the total count if the totalCount is null", () => {
      render(
        <DataList
          loading={false}
          totalCount={null}
          data={[{ label: "Luke Skywalker" }]}
          headers={{
            label: "Name",
          }}
          title="All Clients"
        >
          <></>
        </DataList>,
      );
      expect(screen.getByText("All Clients")).toBeInTheDocument();
      expect(screen.queryByText("(10 results)")).not.toBeInTheDocument();
    });

    it("should render the Glimmer when loading", () => {
      render(
        <DataList
          loading={true}
          totalCount={null}
          data={[{ label: "Luke Skywalker" }]}
          headers={{
            label: "Name",
          }}
          title="All Clients"
        >
          <></>
        </DataList>,
      );
      const results = screen.getByTestId(DATALIST_TOTALCOUNT_TEST_ID);
      expect(within(results).getByTestId(GLIMMER_TEST_ID)).toBeInTheDocument();
    });
  });

  const mockData = [
    { name: "John", email: "john@doe.com" },
    { name: "Jane", email: "jane@doe.com" },
  ];
  const emptyMockData = [] as typeof mockData;
  const mockHeaders: Record<keyof (typeof mockData)[number], string> = {
    name: "Name",
    email: "Email",
  };

  function getCssVarForListItem(cssVar: string, testID: string): any[] {
    const elements = screen.getAllByTestId(testID);
    return elements.map(element => {
      if (!element.parentElement) return;
      return window
        .getComputedStyle(element.parentElement)
        .getPropertyValue(cssVar);
    });
  }

  describe("Layout", () => {
    const layoutWrapper = "layout-wrapper";
    const layoutItem = "layout-item";

    beforeEach(() => {
      render(
        <DataList data={mockData} headers={mockHeaders}>
          <DataList.Layout>
            {(item: DataListItemType<typeof mockData>) => (
              <div data-testid={layoutWrapper}>
                <div data-testid={layoutItem}>{item.name}</div>
                <div data-testid={layoutItem}>{item.email}</div>
              </div>
            )}
          </DataList.Layout>
        </DataList>,
      );
    });

    it("should render the specified layout", () => {
      expect(screen.getAllByTestId(layoutWrapper)).toHaveLength(3);
      expect(screen.getAllByTestId(layoutItem)).toHaveLength(6);
      BREAKPOINTS.forEach(size => {
        expect(
          getCssVarForListItem(`--data-list-${size}-display`, layoutWrapper),
        ).toEqual(new Array(3).fill("block"));
      });
    });

    it("should render the data with the default paragraph element", () => {
      const data = mockData[0];
      expect(screen.getByText(data.name)).toBeInstanceOf(HTMLParagraphElement);
      expect(screen.getByText(data.email)).toBeInstanceOf(HTMLParagraphElement);
    });
  });
  describe("Layout Breakpoints", () => {
    const layoutWrapper = "layout-wrapper";
    const layoutItem = "layout-item";

    function renderLayout(
      layoutProps?: Partial<DataListLayoutProps<DataListObject>>,
    ) {
      return render(
        <DataList data={mockData} headers={mockHeaders}>
          <DataList.Layout {...layoutProps}>
            {(item: DataListItemType<typeof mockData>) => (
              <div data-testid={layoutWrapper}>
                <div data-testid={layoutItem}>{item.name}</div>
                <div data-testid={layoutItem}>{item.email}</div>
              </div>
            )}
          </DataList.Layout>
        </DataList>,
      );
    }

    it.each<{ size: Breakpoints; expected?: Breakpoints[] }>([
      { size: "xs", expected: ["xs", "sm", "md", "lg", "xl"] },
      { size: "sm", expected: ["sm", "md", "lg", "xl"] },
      { size: "md", expected: ["md", "lg", "xl"] },
      { size: "lg", expected: ["lg", "xl"] },
      { size: "xl", expected: ["xl"] },
    ])(
      "should render the with css variables for sizing $size",
      ({ size, expected }) => {
        renderLayout({ size });
        expect(screen.getAllByTestId(layoutWrapper)).toHaveLength(3);
        expect(screen.getAllByTestId(layoutItem)).toHaveLength(6);
        expect(screen.getAllByTestId(layoutWrapper)).toHaveLength(3);
        expect(screen.getAllByTestId(layoutItem)).toHaveLength(6);
        const elements = screen.getAllByTestId(layoutWrapper);

        elements.forEach(() => {
          BREAKPOINTS.forEach(breakpoint => {
            const expectedDisplay = expected?.includes(breakpoint)
              ? "block"
              : "none";
            expect(
              getCssVarForListItem(
                `--data-list-${breakpoint}-display`,
                layoutWrapper,
              ),
            ).toEqual(new Array(3).fill(expectedDisplay));
          });
        });
      },
    );

    it.each<{
      layoutSize1: Breakpoints;
      expectedLayout1?: Breakpoints[];
      layoutSize2: Breakpoints;
      expectedLayout2?: Breakpoints[];
    }>([
      {
        layoutSize1: "xs",
        expectedLayout1: ["xs"],
        layoutSize2: "sm",
        expectedLayout2: ["sm", "md", "lg", "xl"],
      },
      {
        layoutSize1: "sm",
        expectedLayout1: ["sm"],
        layoutSize2: "md",
        expectedLayout2: ["md", "lg", "xl"],
      },
      {
        layoutSize1: "md",
        expectedLayout1: ["md"],
        layoutSize2: "lg",
        expectedLayout2: ["lg", "xl"],
      },
      {
        layoutSize1: "lg",
        expectedLayout1: ["lg"],
        layoutSize2: "xl",
        expectedLayout2: ["xl"],
      },
    ])(
      "when multiple layouts are specified it should hide smaller layouts",
      ({ layoutSize1, layoutSize2, expectedLayout1, expectedLayout2 }) => {
        const layout1Wrapper = "layout1-wrapper";
        const layout2Wrapper = "layout2-wrapper";
        render(
          <DataList data={mockData} headers={mockHeaders}>
            <DataList.Layout size={layoutSize1}>
              {(item: DataListItemType<typeof mockData>) => (
                <div data-testid={layout1Wrapper}>
                  <div data-testid={layoutItem}>{item.name}</div>
                  <div data-testid={layoutItem}>{item.email}</div>
                </div>
              )}
            </DataList.Layout>
            <DataList.Layout size={layoutSize2}>
              {(item: DataListItemType<typeof mockData>) => (
                <div data-testid={layout2Wrapper}>
                  <div data-testid={layoutItem}>{item.name}</div>
                  <div data-testid={layoutItem}>{item.email}</div>
                </div>
              )}
            </DataList.Layout>
          </DataList>,
        );

        const layout1Elements = screen.getAllByTestId(layout1Wrapper);
        expect(screen.getAllByTestId(layout1Wrapper)).toHaveLength(3);

        layout1Elements.forEach(() => {
          BREAKPOINTS.forEach(breakpoint => {
            const expectedDisplay = expectedLayout1?.includes(breakpoint)
              ? "block"
              : "none";
            expect(
              getCssVarForListItem(
                `--data-list-${breakpoint}-display`,
                layout1Wrapper,
              ),
            ).toEqual(new Array(3).fill(expectedDisplay));
          });
        });
        const layout2Elements = screen.getAllByTestId(layout2Wrapper);
        expect(screen.getAllByTestId(layout2Wrapper)).toHaveLength(3);

        layout2Elements.forEach(() => {
          BREAKPOINTS.forEach(breakpoint => {
            const expectedDisplay = expectedLayout2?.includes(breakpoint)
              ? "block"
              : "none";
            expect(
              getCssVarForListItem(
                `--data-list-${breakpoint}-display`,
                layout2Wrapper,
              ),
            ).toEqual(new Array(3).fill(expectedDisplay));
          });
        });
      },
    );
  });

  describe("Header", () => {
    function renderLayout(
      layoutProps?: Partial<DataListLayoutProps<DataListObject>>,
    ) {
      render(
        <DataList data={mockData} headers={mockHeaders}>
          <DataList.Layout {...layoutProps}>
            {(item: DataListItemType<typeof mockData>) => (
              <div>{item.name}</div>
            )}
          </DataList.Layout>
        </DataList>,
      );
    }

    it("should only render the header that's specified on the layout", () => {
      renderLayout();
      expect(screen.getByText(mockHeaders.name)).toBeInTheDocument();
      expect(screen.queryByText(mockHeaders.email)).not.toBeInTheDocument();
    });

    it("should render the header with the correct element", () => {
      renderLayout();
      expect(screen.getByText(mockHeaders.name)).toBeInstanceOf(
        HTMLParagraphElement,
      );
    });

    it("should hide the header if specified on the layout", () => {
      renderLayout({ showHeader: false });
      expect(screen.queryByText(mockHeaders.name)).not.toBeInTheDocument();
      expect(screen.queryByText(mockHeaders.email)).not.toBeInTheDocument();
    });
  });

  it("should render a title when it's provided", () => {
    render(
      <DataList
        loading={false}
        title="All Clients"
        headers={{}}
        data={emptyMockData}
      >
        <></>
      </DataList>,
    );
    expect(screen.getByText("All Clients")).toBeInTheDocument();
  });

  describe("EmptyState", () => {
    const emptyStateMessage = "No items to display";
    const emptyStateActionLabel = "Create new item";
    const emptyStateAction = jest.fn();

    function renderEmptyState(
      props?: Partial<DataListProps<(typeof mockData)[number]>>,
    ) {
      render(
        <DataList data={emptyMockData} headers={{}} {...props}>
          <DataList.EmptyState
            message={emptyStateMessage}
            action={{
              label: emptyStateActionLabel,
              onClick: emptyStateAction,
            }}
          />
        </DataList>,
      );
    }

    it("should render the empty state when there are no items and not loading", () => {
      renderEmptyState();

      expect(screen.getByText(emptyStateMessage)).toBeInTheDocument();
      expect(screen.getByText(emptyStateActionLabel)).toBeInTheDocument();
    });

    it("should not render when there are items", () => {
      renderEmptyState({ data: mockData });
      expect(screen.queryByText(emptyStateMessage)).not.toBeInTheDocument();
    });

    it("should not render when loading", () => {
      renderEmptyState({ loading: true });
      expect(screen.queryByText(emptyStateMessage)).not.toBeInTheDocument();
    });

    it("should call the action when the button is clicked", () => {
      renderEmptyState();

      fireEvent.click(screen.getByText(emptyStateActionLabel));
      expect(emptyStateAction).toHaveBeenCalled();
    });

    it("should display clear filters action when there are filters", () => {
      renderEmptyState({ filterApplied: true });

      expect(screen.getByText(EMPTY_FILTER_RESULTS_MESSAGE)).toBeTruthy();
      expect(screen.getByText(EMPTY_FILTER_RESULTS_ACTION_LABEL)).toBeTruthy();
    });
  });
});
