import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { configMocks, mockIntersectionObserver } from "jsdom-testing-mocks";
import { DataListLoadMore, MAX_DATA_COUNT } from "./DataListLoadMore";
import { DataListContext, defaultValues } from "../../context/DataListContext";
import { DATA_LIST_LOADING_MORE_SPINNER_TEST_ID } from "../../DataList.const";

configMocks({ act });
const observer = mockIntersectionObserver();

const mockData = Array.from({ length: MAX_DATA_COUNT + 1 }, (_, id) => ({
  id,
}));

describe("DataListLoadMore", () => {
  it("should fire the onLoadMore when the target element is visible", () => {
    const onLoadMore = jest.fn();
    render(
      <DataListContext.Provider value={{ ...defaultValues, onLoadMore }}>
        <DataListLoadMore onBackToTop={jest.fn()} />
      </DataListContext.Provider>,
    );

    expect(onLoadMore).not.toHaveBeenCalled();

    observer.enterAll();
    expect(onLoadMore).toHaveBeenCalled();
  });

  it("should render the loading spinner when loading more", () => {
    render(
      <DataListContext.Provider
        value={{ ...defaultValues, loadingState: "loadingMore" }}
      >
        <DataListLoadMore onBackToTop={jest.fn()} />
      </DataListContext.Provider>,
    );
    expect(
      screen.getByTestId(DATA_LIST_LOADING_MORE_SPINNER_TEST_ID),
    ).toBeInTheDocument();
  });

  it("should not render the loading spinner and show back to top button when it's not loading more", () => {
    render(
      <DataListContext.Provider value={{ ...defaultValues, data: mockData }}>
        <DataListLoadMore onBackToTop={jest.fn()} />
      </DataListContext.Provider>,
    );

    expect(
      screen.queryByTestId(DATA_LIST_LOADING_MORE_SPINNER_TEST_ID),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Back to top" }),
    ).toBeInTheDocument();
  });

  it("should fire the onBackToTop callback", () => {
    const handleBackToTop = jest.fn();
    render(
      <DataListContext.Provider value={{ ...defaultValues, data: mockData }}>
        <DataListLoadMore onBackToTop={handleBackToTop} />
      </DataListContext.Provider>,
    );

    userEvent.click(screen.getByRole("button", { name: "Back to top" }));

    expect(handleBackToTop).toHaveBeenCalled();
  });
});
