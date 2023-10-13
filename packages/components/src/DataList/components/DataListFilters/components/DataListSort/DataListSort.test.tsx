import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DataListContext,
  defaultValues,
} from "@jobber/components/DataList/context/DataListContext";
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
});
