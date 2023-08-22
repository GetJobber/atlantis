import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { DataList } from "./DataList";
import {
  EMPTY_FILTER_RESULTS_ACTION_LABEL,
  EMPTY_FILTER_RESULTS_MESSAGE,
} from "./DataList.const";
import { DataListItemType, DataListProps } from "./DataList.types";
import { DATALIST_TOTALCOUNT_TEST_ID } from "./components/DataListTotalCount";
import { GLIMMER_TEST_ID } from "../Glimmer";

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

  describe("Header", () => {
    beforeEach(() => {
      render(
        <DataList data={mockData} headers={mockHeaders}>
          <DataList.Layout>
            {(item: DataListItemType<typeof mockData>) => (
              <div>{item.name}</div>
            )}
          </DataList.Layout>
        </DataList>,
      );
    });

    it("should only render the header that's specified on the layout", () => {
      expect(screen.getByText(mockHeaders.name)).toBeInTheDocument();
      expect(screen.queryByText(mockHeaders.email)).not.toBeInTheDocument();
    });

    it("should render the header with the correct element", () => {
      expect(screen.getByText(mockHeaders.name)).toBeInstanceOf(
        HTMLParagraphElement,
      );
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
