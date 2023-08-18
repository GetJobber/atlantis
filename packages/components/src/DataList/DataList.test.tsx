import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { DataList } from "./DataList";
import {
  EMPTY_FILTER_RESULTS_ACTION_LABEL,
  EMPTY_FILTER_RESULTS_MESSAGE,
} from "./DataList.const";
import { DataListProps } from "./DataList.types";
import { GLIMMER_TEST_ID } from "../Glimmer";

describe.skip("DataList1", () => {
  it("should render a title when it's provided", () => {
    // render(<DataList loading={false} title="All Clients" />);
    // expect(screen.getByText("All Clients")).toBeInTheDocument();
  });

  it("should render the total count if showCount prop is provided", () => {
    // render(<DataList loading={false} showCount={true} totalCount={10} />);
    // expect(screen.getByText("(10 results)")).toBeInTheDocument();
  });

  it("should not render the total count if the showCount prop is false", () => {
    // render(
    //   <DataList
    //     loading={false}
    //     title="All Clients"
    //     totalCount={10}
    //     showCount={false}
    //   />,
    // );
    // expect(screen.getByText("All Clients")).toBeInTheDocument();
    // expect(screen.queryByText("(10 results)")).toBeNull();
  });

  it("should render the Glimmer when loading", () => {
    // render(<DataList loading={true} title="All Clients" />);
    // expect(screen.getByTestId(GLIMMER_TEST_ID)).toBeInTheDocument();
  });
});
describe("DataList", () => {
  const mockData = [{ name: "John" }];
  const emptyMockData = [] as typeof mockData;

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
