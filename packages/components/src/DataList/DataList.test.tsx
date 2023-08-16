import { fireEvent, render } from "@testing-library/react";
import React from "react";
import {
  DataList,
  DataListProps,
  EMPTY_FILTER_RESULTS_ACTION_LABEL,
  EMPTY_FILTER_RESULTS_MESSAGE,
} from "./DataList";

describe("DataList", () => {
  const emptyStateMessage = "No items to display";
  const emptyStateActionLabel = "Create new item";
  const emptyStateAction = jest.fn();
  function renderDataList(dataListProps?: Partial<DataListProps>) {
    const props: DataListProps = {
      items: [],
      ...dataListProps,
    };
    return render(<DataList {...props} />);
  }
  describe("EmptyState", () => {
    it("should render the empty state when there are no items and not loading", () => {
      const { getByText } = renderDataList({
        children: (
          <DataList.EmptyState
            {...{
              message: emptyStateMessage,
              action: {
                label: emptyStateActionLabel,
                onClick: emptyStateAction,
              },
            }}
          />
        ),
      });
      expect(getByText(emptyStateMessage)).toBeTruthy();
      expect(getByText(emptyStateActionLabel)).toBeTruthy();
    });

    it("should not render when there are items", () => {
      const { queryByText } = renderDataList({ items: ["test item"] });
      expect(queryByText(emptyStateMessage)).not.toBeInTheDocument();
    });

    it("should not render when loading", () => {
      const { queryByText } = renderDataList({ loading: true });
      expect(queryByText(emptyStateMessage)).not.toBeInTheDocument();
    });

    it("should call the action when the button is clicked", () => {
      const { getByText } = renderDataList({
        children: (
          <DataList.EmptyState
            {...{
              message: emptyStateMessage,
              action: {
                label: emptyStateActionLabel,
                onClick: emptyStateAction,
              },
            }}
          />
        ),
      });
      fireEvent.click(getByText(emptyStateActionLabel));
      expect(emptyStateAction).toHaveBeenCalled();
    });

    it("should display clear filters action when there are filters", () => {
      const { getByText } = renderDataList({
        filterApplied: true,
        children: (
          <DataList.EmptyState
            {...{
              message: emptyStateMessage,
              action: {
                label: emptyStateActionLabel,
                onClick: emptyStateAction,
              },
            }}
          />
        ),
      });
      expect(getByText(EMPTY_FILTER_RESULTS_MESSAGE)).toBeTruthy();
      expect(getByText(EMPTY_FILTER_RESULTS_ACTION_LABEL)).toBeTruthy();
    });
  });
});
