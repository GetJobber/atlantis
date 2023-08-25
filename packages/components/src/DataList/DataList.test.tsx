import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { DataList } from "./DataList";
import {
  BREAKPOINT_SIZES,
  Breakpoints,
  EMPTY_FILTER_RESULTS_ACTION_LABEL,
  EMPTY_FILTER_RESULTS_MESSAGE,
} from "./DataList.const";
import { DataListItemType, DataListProps } from "./DataList.types";
import { DATALIST_TOTALCOUNT_TEST_ID } from "./components/DataListTotalCount";
import { GLIMMER_TEST_ID } from "../Glimmer";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("DataList", () => {
  const mockTitle = "All people";

  describe("Title and results counter", () => {
    const mockData = [{ id: 1, label: "Luke Skywalker" }];
    const mockHeader = { label: "Name" };

    it("should render the total count", () => {
      render(
        <DataList
          loading={false}
          totalCount={10}
          data={mockData}
          headers={mockHeader}
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
          data={mockData}
          headers={mockHeader}
          title={mockTitle}
        >
          <></>
        </DataList>,
      );
      expect(screen.getByText(mockTitle)).toBeInTheDocument();
      expect(screen.queryByText("(10 results)")).not.toBeInTheDocument();
    });

    it("should render the Glimmer when loading", () => {
      render(
        <DataList
          loading={true}
          totalCount={null}
          data={mockData}
          headers={mockHeader}
          title={mockTitle}
        >
          <></>
        </DataList>,
      );
      const results = screen.getByTestId(DATALIST_TOTALCOUNT_TEST_ID);
      expect(within(results).getByTestId(GLIMMER_TEST_ID)).toBeInTheDocument();
    });
  });

  const mockData = [
    { id: 1, name: "John", email: "john@doe.com" },
    { id: 2, name: "Jane", email: "jane@doe.com" },
  ];
  const emptyMockData = [] as typeof mockData;
  const mockHeaders = {
    name: "Name",
    email: "Email",
  };

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
    });

    it("should render the data with the default paragraph element", () => {
      const data = mockData[0];
      expect(screen.getByText(data.name)).toBeInstanceOf(HTMLParagraphElement);
      expect(screen.getByText(data.email)).toBeInstanceOf(HTMLParagraphElement);
    });
  });

  describe("Layout Breakpoints", () => {
    const layoutItem = "layout-item";

    function setUpMediaQueries(expectedValues: Record<Breakpoints, boolean>) {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query: string) => {
          const queryValue = parseInt(query.match(/(\d+)/)?.[0] || "0", 10);
          const queryBreakpoint = Object.entries(BREAKPOINT_SIZES).find(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ([_, value]) => {
              return value === queryValue;
            },
          )?.[0];
          const expectedValue = expectedValues[queryBreakpoint as Breakpoints];
          return {
            matches: expectedValue,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          };
        }),
      });
    }

    it.each<{
      layoutSize1: Breakpoints;
      mockedQueries: Record<Breakpoints, boolean>;
      layoutSize2: Breakpoints;
    }>([
      {
        layoutSize1: "xs",
        mockedQueries: { xs: true, sm: true, md: true, lg: true, xl: true },
        layoutSize2: "sm",
      },
      {
        layoutSize1: "sm",
        mockedQueries: { xs: true, sm: true, md: true, lg: true, xl: true },
        layoutSize2: "md",
      },
      {
        layoutSize1: "md",
        mockedQueries: { xs: true, sm: true, md: true, lg: true, xl: true },
        layoutSize2: "lg",
      },
      {
        layoutSize1: "lg",
        mockedQueries: { xs: true, sm: true, md: true, lg: true, xl: true },
        layoutSize2: "xl",
      },
    ])(
      "when multiple layouts are specified it should render the larger layout",
      ({ layoutSize1, layoutSize2, mockedQueries }) => {
        const layout1Wrapper = "layout1-wrapper";
        const layout2Wrapper = "layout2-wrapper";
        setUpMediaQueries(mockedQueries);
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

        expect(screen.queryAllByTestId(layout1Wrapper)).toHaveLength(0);
        expect(screen.queryAllByTestId(layout2Wrapper)).not.toHaveLength(0);
      },
    );

    it.each<{
      layoutSize1: Breakpoints;
      mockedQueries: Record<Breakpoints, boolean>;
      headerVisibility: { [Breakpoint in Breakpoints]?: boolean };
      isHeaderVisible: boolean;
      layoutSize2: Breakpoints;
    }>([
      {
        layoutSize1: "xs",
        mockedQueries: { xs: true, sm: true, md: false, lg: false, xl: false },
        headerVisibility: { xs: false },
        isHeaderVisible: false,
        layoutSize2: "md",
      },
      {
        layoutSize1: "sm",
        mockedQueries: { xs: true, sm: true, md: true, lg: true, xl: true },
        headerVisibility: { xs: true },
        isHeaderVisible: true,
        layoutSize2: "md",
      },
    ])(
      "should use the header visibility from the smaller layout is not specified",
      ({
        layoutSize1,
        layoutSize2,
        mockedQueries,
        headerVisibility,
        isHeaderVisible,
      }) => {
        const layout1Wrapper = "layout1-wrapper";
        const layout2Wrapper = "layout2-wrapper";
        setUpMediaQueries(mockedQueries);
        render(
          <DataList
            data={mockData}
            headers={mockHeaders}
            headerVisibility={headerVisibility}
          >
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
        expect(screen.queryAllByText(mockHeaders.name).length > 0).toBe(
          isHeaderVisible,
        );
      },
    );
  });

  describe("Header", () => {
    function renderLayout(
      headerVisibility?: DataListProps<
        (typeof mockData)[0]
      >["headerVisibility"],
    ) {
      render(
        <DataList
          data={mockData}
          headers={mockHeaders}
          headerVisibility={headerVisibility}
        >
          <DataList.Layout>
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
      renderLayout({ xs: false });
      expect(screen.queryByText(mockHeaders.name)).not.toBeInTheDocument();
      expect(screen.queryByText(mockHeaders.email)).not.toBeInTheDocument();
    });
  });

  it("should render a title when it's provided", () => {
    render(
      <DataList
        loading={false}
        title={mockTitle}
        headers={{}}
        data={emptyMockData}
      >
        <></>
      </DataList>,
    );
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
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
