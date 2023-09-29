import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { configMocks, mockIntersectionObserver } from "jsdom-testing-mocks";
import { DataListFilters, InternalDataListFilters } from "./DataListFilters";
import { CONTAINER_TEST_ID } from "../DataListOverflowFade/DataListOverflowFade.const";
import { defaultValues } from "../../context/DataListContext";
import * as dataListContext from "../../context/DataListContext/DataListContext";
import * as useShowHeader from "../../hooks/useShowHeader";

configMocks({ act });
const observer = mockIntersectionObserver();

const spy = jest.spyOn(dataListContext, "useDataListContext");
const contextValueWithRenderableChildren = {
  ...defaultValues,
  children: (
    <DataListFilters>
      <button />
      <button />
      <button />
    </DataListFilters>
  ),
};
const showHeaderSpy = jest.spyOn(useShowHeader, "useShowHeader");

afterEach(() => {
  cleanup();
  spy.mockReset();
  showHeaderSpy.mockReset();
});

describe("DataListFilters", () => {
  it("should not render anything", () => {
    const text = "Don't render me";

    render(
      <DataListFilters>
        <div>{text}</div>
      </DataListFilters>,
    );

    expect(screen.queryByText(text)).not.toBeInTheDocument();
  });
});

describe("InternalDataListFilters", () => {
  describe("Overflowing fade", () => {
    it("should show the overflow fade", () => {
      spy.mockReturnValue(contextValueWithRenderableChildren);
      render(<InternalDataListFilters />);

      observer.leaveAll();

      expect(screen.getByTestId(CONTAINER_TEST_ID)).toHaveClass(
        "overflowLeft overflowRight",
      );
    });

    it("should not show the overflow fade", () => {
      spy.mockReturnValue(contextValueWithRenderableChildren);
      render(<InternalDataListFilters />);

      observer.enterAll();

      expect(screen.getByTestId(CONTAINER_TEST_ID)).not.toHaveClass(
        "overflowLeft overflowRight",
      );
    });

    it("should only show the right overflow fade", () => {
      spy.mockReturnValue(contextValueWithRenderableChildren);
      render(<InternalDataListFilters />);
      const container = screen.getByTestId(CONTAINER_TEST_ID);
      const triggers =
        container.querySelectorAll<HTMLElement>(".overflowTrigger");

      observer.enterNode(triggers.item(0));

      expect(container).toHaveClass("overflowRight");
      expect(container).not.toHaveClass("overflowLeft");
    });

    it("should only show the left overflow fade", () => {
      spy.mockReturnValue(contextValueWithRenderableChildren);
      render(<InternalDataListFilters />);
      const container = screen.getByTestId(CONTAINER_TEST_ID);
      const triggers =
        container.querySelectorAll<HTMLElement>(".overflowTrigger");

      observer.enterNode(triggers.item(1));

      expect(container).not.toHaveClass("overflowRight");
      expect(container).toHaveClass("overflowLeft");
    });
  });

  it("should render the passed in children when DataListFilters is implemented", () => {
    spy.mockReturnValue(contextValueWithRenderableChildren);
    render(<InternalDataListFilters />);

    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("should render nothing when it's DataListFilters is not implemented", () => {
    spy.mockReturnValue({ ...defaultValues, children: <button /> });
    render(<InternalDataListFilters />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  describe("Sort", () => {
    const mockContextValueWithSorting = {
      ...contextValueWithRenderableChildren,
      sorting: { sortable: ["name"], state: undefined, onSort: jest.fn() },
    };

    it("should render the sort button when the header is not there", () => {
      spy.mockReturnValue(mockContextValueWithSorting);
      showHeaderSpy.mockReturnValueOnce(false);
      render(<InternalDataListFilters />);

      expect(
        screen.getByRole("button", { name: "Sort by" }),
      ).toBeInTheDocument();
    });

    it("should not render the sort button when the header is there", () => {
      spy.mockReturnValue(mockContextValueWithSorting);
      showHeaderSpy.mockReturnValueOnce(true);
      render(<InternalDataListFilters />);

      expect(
        screen.queryByRole("button", { name: "Sort by" }),
      ).not.toBeInTheDocument();
    });
  });
});
