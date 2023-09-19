import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DataListContext,
  defaultValues,
} from "@jobber/components/DataList/context/DataListContext";
import { DataListSorting } from "@jobber/components/DataList/DataList.types";
import { DataListSort } from "./DataListSort";

const sortableKeys = ["label", "address"] as const;
const handleSort = jest.fn();
const mockContextValue = {
  ...defaultValues,
  headers: { label: "Label", address: "Address", phone: "Phone" },
  sorting: {
    sortable: [...sortableKeys],
    state: undefined,
    onSort: handleSort,
  },
};

const buttonLabel = "Sort by";

afterEach(() => {
  handleSort.mockClear();
});

describe("DataListSort", () => {
  it("should only render a button", () => {
    render(
      <DataListContext.Provider value={mockContextValue}>
        <DataListSort />
      </DataListContext.Provider>,
    );

    expect(
      screen.getByRole("button", { name: buttonLabel }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should not render a button when sorting is undefined", () => {
    render(
      <DataListContext.Provider value={defaultValues}>
        <DataListSort />
      </DataListContext.Provider>,
    );

    expect(
      screen.queryByRole("button", { name: buttonLabel }),
    ).not.toBeInTheDocument();
  });

  describe("Popover", () => {
    beforeEach(() => {
      render(
        <DataListContext.Provider value={mockContextValue}>
          <DataListSort />
        </DataListContext.Provider>,
      );

      userEvent.click(screen.getByRole("button", { name: buttonLabel }));
    });

    it("should render a popover when the button is clicked", () => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should close the popover when the button is clicked again", () => {
      userEvent.click(screen.getByRole("button", { name: buttonLabel }));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should close the popover when the close button is pressed", () => {
      userEvent.click(screen.getByRole("button", { name: "Close dialog" }));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("Sort by chips", () => {
    beforeEach(() => {
      render(
        <DataListContext.Provider value={mockContextValue}>
          <DataListSort />
        </DataListContext.Provider>,
      );

      userEvent.click(screen.getByRole("button", { name: buttonLabel }));
    });

    it.each(sortableKeys)("should render a chip for %s", name => {
      expect(
        screen.getByRole("radio", { name: mockContextValue.headers[name] }),
      ).toBeInTheDocument();
    });

    it("should render a chip for none", () => {
      expect(screen.getByRole("radio", { name: "None" })).toBeInTheDocument();
    });

    it("should render a chip for ascending and descending and they're disabled", () => {
      const ascendingRadio = screen.getByRole("radio", { name: "Ascending" });
      expect(ascendingRadio).toBeInTheDocument();
      expect(ascendingRadio).toBeDisabled();

      const descendingRadio = screen.getByRole("radio", { name: "Descending" });
      expect(descendingRadio).toBeInTheDocument();
      expect(descendingRadio).toBeDisabled();
    });
  });

  describe("Sorting key change", () => {
    beforeEach(() => {
      render(
        <DataListContext.Provider value={mockContextValue}>
          <DataListSort />
        </DataListContext.Provider>,
      );

      userEvent.click(screen.getByRole("button", { name: buttonLabel }));
    });

    it.each(sortableKeys)("should call onSort with %s", name => {
      userEvent.click(
        screen.getByRole("radio", { name: mockContextValue.headers[name] }),
      );

      expect(handleSort).toHaveBeenCalledWith({
        key: name,
        direction: "asc",
      });
    });

    it("should call onSort with undefined when none is clicked", () => {
      userEvent.click(screen.getByRole("radio", { name: "None" }));
      expect(handleSort).toHaveBeenCalledWith(undefined);
    });
  });

  describe("'Ordered by' change", () => {
    const initialSortingState: DataListSorting = {
      key: "label",
      direction: "asc",
    };

    beforeEach(() => {
      render(
        <DataListContext.Provider
          value={{
            ...mockContextValue,
            sorting: {
              ...mockContextValue.sorting,
              state: initialSortingState,
            },
          }}
        >
          <DataListSort />
        </DataListContext.Provider>,
      );

      userEvent.click(
        screen.getByRole("button", { name: RegExp(buttonLabel, "i") }),
      );
    });

    it("should call not call onSort when you're selecting the already selected value", () => {
      userEvent.click(screen.getByRole("radio", { name: "Ascending" }));
      expect(handleSort).not.toHaveBeenCalled();
    });

    it("should call onSort with the new direction", () => {
      userEvent.click(screen.getByRole("radio", { name: "Descending" }));
      expect(handleSort).toHaveBeenCalledWith({
        ...initialSortingState,
        direction: "desc",
      });
    });
  });
});
