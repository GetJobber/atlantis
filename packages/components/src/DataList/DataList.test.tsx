import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { DataList } from "./DataList";
import {
  EMPTY_FILTER_RESULTS_ACTION_LABEL,
  EMPTY_FILTER_RESULTS_MESSAGE,
} from "./DataList.const";
import { DataListItemType, DataListProps } from "./DataList.types";
import { Grid } from "../Grid";
import { GLIMMER_TEST_ID } from "../Glimmer";

describe("DataList", () => {
  it("should render the total count if showCount prop is provided", () => {
    const mappedData = [{ label: "Name" }];
    render(
      <DataList
        loading={false}
        totalCount={10}
        data={[{ label: "Luke Skywalker" }]}
        headers={{
          label: "Name",
        }}
      >
        <DataList.Layout>
          {(item: DataListItemType<typeof mappedData>) => (
            <Grid alignItems="center">
              <Grid.Cell size={{ xs: 6 }}>{item.label}</Grid.Cell>
            </Grid>
          )}
        </DataList.Layout>
      </DataList>,
    );
    expect(screen.getByText("(10 results)")).toBeInTheDocument();
  });

  it("should not render the total count if the totalCount is null", () => {
    const mappedData = [{ label: "Name" }];
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
        <DataList.Layout>
          {(item: DataListItemType<typeof mappedData>) => (
            <Grid alignItems="center">
              <Grid.Cell size={{ xs: 6 }}>{item.label}</Grid.Cell>
            </Grid>
          )}
        </DataList.Layout>
      </DataList>,
    );
    expect(screen.getByText("All Clients")).toBeInTheDocument();
    expect(screen.queryByText("(10 results)")).toBeNull();
  });

  it("should render the Glimmer when loading", () => {
    const mappedData = [{ label: "Name" }];
    render(
      <DataList
        loading={true}
        totalCount={10}
        data={[{ label: "Luke Skywalker" }]}
        headers={{
          label: "Name",
        }}
        title="All Clients"
      >
        <DataList.Layout>
          {(item: DataListItemType<typeof mappedData>) => (
            <Grid alignItems="center">
              <Grid.Cell size={{ xs: 6 }}>{item.label}</Grid.Cell>
            </Grid>
          )}
        </DataList.Layout>
      </DataList>,
    );
    expect(screen.getByTestId(GLIMMER_TEST_ID)).toBeInTheDocument();
  });
});
describe("DataList EmptyState", () => {
  const mockData = [{ name: "John" }];
  const emptyMockData = [] as typeof mockData;

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
