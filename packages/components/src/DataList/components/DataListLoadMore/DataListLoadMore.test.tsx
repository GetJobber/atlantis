import React from "react";
import { act, render } from "@testing-library/react";
import { configMocks, mockIntersectionObserver } from "jsdom-testing-mocks";
import { DataListLoadMore } from "./DataListLoadMore";
import { DataListContext, defaultValues } from "../../context/DataListContext";

configMocks({ act });
const observer = mockIntersectionObserver();

describe("DataListLoadMore", () => {
  it("should fire the onLoadMore when the target element is visible", () => {
    const onLoadMore = jest.fn();
    render(
      <DataListContext.Provider value={{ ...defaultValues, onLoadMore }}>
        <DataListLoadMore />
      </DataListContext.Provider>,
    );

    expect(onLoadMore).not.toHaveBeenCalled();

    observer.enterAll();
    expect(onLoadMore).toHaveBeenCalled();
  });
});
