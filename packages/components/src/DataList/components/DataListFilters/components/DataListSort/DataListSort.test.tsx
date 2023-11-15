import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DataListContext,
  defaultValues,
} from "@jobber/components/DataList/context/DataListContext";
import { DataListSort } from "./DataListSort";

const MENU_TEST_ID = "ATL-Combobox-Content";
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

const buttonLabel = "Sort |";

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

    expect(screen.getByRole("combobox")).toBeInTheDocument();
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

  describe("Combobox", () => {
    beforeEach(async () => {
      render(
        <DataListContext.Provider value={mockContextValue}>
          <DataListSort />
        </DataListContext.Provider>,
      );

      await userEvent.click(screen.getByRole("combobox"));
    });

    it("should render a listbox when the button is clicked", () => {
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("should close the popover when the button is clicked again", async () => {
      await userEvent.click(screen.getByRole("combobox"));
      expect(screen.getByTestId(MENU_TEST_ID)).toHaveClass("hidden");
    });
  });

  describe("Sort by chips", () => {
    beforeEach(async () => {
      render(
        <DataListContext.Provider value={mockContextValue}>
          <DataListSort />
        </DataListContext.Provider>,
      );

      await userEvent.click(screen.getByRole("combobox"));
    });

    it.each(sortableKeys)(
      "should render ascending and descending chip for %s",
      name => {
        expect(
          screen.getByRole("option", {
            name: `${mockContextValue.headers[name]} (A-Z)`,
          }),
        ).toBeInTheDocument();

        expect(
          screen.getByRole("option", {
            name: `${mockContextValue.headers[name]} (Z-A)`,
          }),
        ).toBeInTheDocument();
      },
    );

    it("should render a chip for none", () => {
      expect(screen.getByRole("option", { name: "None" })).toBeInTheDocument();
    });
  });

  describe("Sorting key change", () => {
    beforeEach(async () => {
      render(
        <DataListContext.Provider value={mockContextValue}>
          <DataListSort />
        </DataListContext.Provider>,
      );

      await userEvent.click(screen.getByRole("combobox"));
    });

    it.each(sortableKeys)(
      "should call onSort with %s ascending",
      async name => {
        await userEvent.click(
          screen.getByRole("option", {
            name: `${mockContextValue.headers[name]} (A-Z)`,
          }),
        );

        expect(handleSort).toHaveBeenCalledWith({
          key: name,
          order: "asc",
        });
      },
    );

    it.each(sortableKeys)(
      "should call onSort with %s descending",
      async name => {
        await userEvent.click(
          screen.getByRole("option", {
            name: `${mockContextValue.headers[name]} (Z-A)`,
          }),
        );

        expect(handleSort).toHaveBeenCalledWith({
          key: name,
          order: "desc",
        });
      },
    );

    it.each(sortableKeys)("should call onSort with %s", async name => {
      await userEvent.click(
        screen.getByRole("option", {
          name: `${mockContextValue.headers[name]} (A-Z)`,
        }),
      );

      expect(handleSort).toHaveBeenCalledWith({
        key: name,
        order: "asc",
      });
    });

    it("should call onSort with undefined when none is clicked", async () => {
      await userEvent.click(screen.getByRole("option", { name: "None" }));
      expect(handleSort).toHaveBeenCalledWith(undefined);
    });
  });
});
