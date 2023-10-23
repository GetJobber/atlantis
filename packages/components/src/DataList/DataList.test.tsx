/* eslint-disable max-statements */
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { configMocks, mockIntersectionObserver } from "jsdom-testing-mocks";
import userEvent from "@testing-library/user-event";
import { Banner } from "@jobber/components/Banner";
import { DataList } from "./DataList";
import {
  BREAKPOINT_SIZES,
  Breakpoints,
  DATA_LIST_FILTERING_SPINNER_TEST_ID,
  DATA_LIST_LOADING_MORE_SPINNER_TEST_ID,
  DATA_LOAD_MORE_TEST_ID,
  EMPTY_FILTER_RESULTS_MESSAGE,
} from "./DataList.const";
import {
  DataListItemType,
  DataListProps,
  DataListSorting,
} from "./DataList.types";
import { DATALIST_TOTALCOUNT_TEST_ID } from "./components/DataListTotalCount";
import {
  DATALIST_LOADINGSTATE_ROW_TEST_ID,
  LOADING_STATE_LIMIT_ITEMS,
} from "./components/DataListLoadingState";
import { MAX_DATA_COUNT } from "./components/DataListLoadMore";
import { SORTING_ICON_TEST_ID } from "./components/DataListHeaderTile/DataListSortingArrows";
import { GLIMMER_TEST_ID } from "../Glimmer";
import { Button } from "../Button";

configMocks({ act });
const observer = mockIntersectionObserver();

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
        <DataList totalCount={10} data={mockData} headers={mockHeader}>
          <></>
        </DataList>,
      );
      expect(screen.getByText("(10 results)")).toBeInTheDocument();
    });

    it("should not render the total count if the totalCount is null", () => {
      render(
        <DataList
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

    it("should render the Glimmer on total count when loading", () => {
      render(
        <DataList
          loadingState="initial"
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

  describe("Loading State", () => {
    it("should render 10 rows of placeholder items when the list is in initial loading state", () => {
      render(
        <DataList
          loadingState="initial"
          data={mockData}
          headers={mockHeaders}
          title="All Clients"
        >
          <DataList.Layout size="lg">
            {(item: DataListItemType<typeof mockData>) => (
              <div>
                <div>{item.name}</div>
                <div>{item.email}</div>
              </div>
            )}
          </DataList.Layout>
        </DataList>,
      );

      expect(
        screen.getAllByTestId(DATALIST_LOADINGSTATE_ROW_TEST_ID).length,
      ).toBe(10);

      const numberOfColumns = Object.keys(mockHeaders).length;

      expect(screen.getAllByTestId(GLIMMER_TEST_ID)).toHaveLength(
        numberOfColumns * LOADING_STATE_LIMIT_ITEMS,
      );
    });

    it("should render a spinner when the loading state is filtering", () => {
      render(
        <DataList
          loadingState="filtering"
          data={mockData}
          headers={mockHeaders}
        >
          <></>
        </DataList>,
      );

      expect(
        screen.getByTestId(DATA_LIST_FILTERING_SPINNER_TEST_ID),
      ).toBeInTheDocument();
    });

    it("should render a spinner when the loading state is loadingMore", () => {
      render(
        <DataList
          loadingState="loadingMore"
          data={mockData}
          headers={mockHeaders}
        >
          <></>
        </DataList>,
      );

      expect(
        screen.getByTestId(DATA_LIST_LOADING_MORE_SPINNER_TEST_ID),
      ).toBeInTheDocument();
    });
  });

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
      sorting?: DataListProps<(typeof mockData)[0]>["sorting"],
    ) {
      render(
        <DataList
          data={mockData}
          headers={mockHeaders}
          headerVisibility={headerVisibility}
          sorting={sorting}
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

  describe("Sorting", () => {
    function MockSortingLayout({
      sorting,
    }: {
      readonly sorting: DataListProps<(typeof mockData)[0]>["sorting"];
    }) {
      return (
        <DataList data={mockData} headers={mockHeaders} sorting={sorting}>
          <DataList.Layout>
            {(item: DataListItemType<typeof mockData>) => (
              <div>{item.name}</div>
            )}
          </DataList.Layout>
        </DataList>
      );
    }

    it("should show the sorting arrows when the header is clicked", () => {
      const mockOnSort = jest.fn();
      const expectedSorting: DataListSorting = {
        order: "asc",
        key: "name",
      };

      const { rerender } = render(
        <MockSortingLayout
          sorting={{
            sortable: ["name"],
            onSort: mockOnSort,
            state: undefined,
          }}
        />,
      );

      expect(
        screen.queryByTestId(SORTING_ICON_TEST_ID),
      ).not.toBeInTheDocument();

      const nameHeader = screen.getByText(mockHeaders.name);
      fireEvent.click(nameHeader);

      expect(mockOnSort).toHaveBeenCalledWith(expectedSorting);

      rerender(
        <MockSortingLayout
          sorting={{
            sortable: ["name"],
            onSort: mockOnSort,
            state: expectedSorting,
          }}
        />,
      );

      expect(screen.queryByTestId(SORTING_ICON_TEST_ID)).toBeInTheDocument();
    });
  });

  it("should render a title when it's provided", () => {
    render(
      <DataList title={mockTitle} headers={{}} data={emptyMockData}>
        <></>
      </DataList>,
    );
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  describe("EmptyState", () => {
    const emptyStateMessage = "No items to display";
    const emptyStateActionLabel = "Create new item";
    const emptyStateAction = jest.fn();
    const emptyStateButton = (
      <Button label={emptyStateActionLabel} onClick={emptyStateAction} />
    );

    function renderEmptyState(
      props?: Partial<DataListProps<(typeof mockData)[number]>>,
    ) {
      render(
        <DataList data={emptyMockData} headers={{}} {...props}>
          <DataList.EmptyState
            message={emptyStateMessage}
            action={emptyStateButton}
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
      renderEmptyState({ loadingState: "initial" });
      expect(screen.queryByText(emptyStateMessage)).not.toBeInTheDocument();
    });

    it("should call the action when the button is clicked", () => {
      renderEmptyState();

      fireEvent.click(screen.getByText(emptyStateActionLabel));
      expect(emptyStateAction).toHaveBeenCalled();
    });

    it("should display the default filters empty state when the data list is filtered", () => {
      renderEmptyState({ filtered: true });

      expect(
        screen.getByText(EMPTY_FILTER_RESULTS_MESSAGE),
      ).toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("Load More", () => {
    it("should trigger the load more callback", () => {
      const handleLoadMore = jest.fn();
      render(
        <DataList
          data={mockData}
          headers={mockHeaders}
          onLoadMore={handleLoadMore}
        >
          <></>
        </DataList>,
      );
      expect(handleLoadMore).not.toHaveBeenCalled();

      observer.enterNode(screen.getByTestId(DATA_LOAD_MORE_TEST_ID));
      expect(handleLoadMore).toHaveBeenCalled();
    });

    it("should not have the trigger element", () => {
      function getElement(
        props?: Partial<DataListProps<(typeof mockData)[0]>>,
      ) {
        return (
          <DataList
            {...props}
            data={props?.data || mockData}
            headers={mockHeaders}
          >
            <></>
          </DataList>
        );
      }

      const { rerender } = render(getElement());

      // Control test: render trigger element first
      expect(screen.queryByTestId(DATA_LOAD_MORE_TEST_ID)).toBeInTheDocument();

      // If the data is empty, the load more trigger should not be rendered
      rerender(getElement({ data: [] }));
      expect(
        screen.queryByTestId(DATA_LOAD_MORE_TEST_ID),
      ).not.toBeInTheDocument();

      // If the data is loading, the load more trigger should not be rendered
      rerender(getElement({ loadingState: "initial" }));
      expect(
        screen.queryByTestId(DATA_LOAD_MORE_TEST_ID),
      ).not.toBeInTheDocument();
    });

    it("should call the scrollIntoView on the target element", () => {
      const scrollIntoViewMock = jest.fn();
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
      render(
        <DataList
          data={Array.from({ length: MAX_DATA_COUNT + 1 }, (_, id) => ({
            id,
          }))}
          headers={{ id: "ID" }}
        >
          <></>
        </DataList>,
      );

      expect(scrollIntoViewMock).not.toHaveBeenCalled();

      userEvent.click(screen.getByRole("button", { name: "Back to top" }));
      expect(scrollIntoViewMock).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    });
  });

  describe("StatusBar", () => {
    it("should show the StatusBar when it's provided", () => {
      const bannerText =
        "Something went wrong. Refresh or check your internet connection.";
      render(
        <DataList
          data={Array.from({ length: MAX_DATA_COUNT + 1 }, (_, id) => ({
            id,
          }))}
          headers={{ id: "ID" }}
        >
          <DataList.StatusBar>
            <Banner type="error" icon="alert">
              {bannerText}
            </Banner>
          </DataList.StatusBar>
        </DataList>,
      );

      expect(screen.getByText(bannerText)).toBeInTheDocument();
    });
  });
});
