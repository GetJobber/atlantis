import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTableSortableHeader } from "./DataTableSortableHeader";
import { SortDirection } from "../../SortIcon";

describe("DataTableSortableHeader", () => {
  const mockOnSort = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when sortable (direction and onSort provided)", () => {
    it("renders as a clickable button", () => {
      render(
        <DataTableSortableHeader
          direction={SortDirection.ascending}
          onSort={mockOnSort}
        >
          Name
        </DataTableSortableHeader>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Name");
    });

    it("calls onSort when clicked", async () => {
      const user = userEvent.setup();
      render(
        <DataTableSortableHeader
          direction={SortDirection.ascending}
          onSort={mockOnSort}
        >
          Name
        </DataTableSortableHeader>,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(mockOnSort).toHaveBeenCalledTimes(1);
    });

    it("renders with sort icon", () => {
      render(
        <DataTableSortableHeader
          direction={SortDirection.ascending}
          onSort={mockOnSort}
        >
          Name
        </DataTableSortableHeader>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button.querySelector(".sortIcon")).toBeInTheDocument();
    });

    it("passes through additional props to the underlying cell", () => {
      render(
        <DataTableSortableHeader
          direction={SortDirection.ascending}
          onSort={mockOnSort}
          data-testid="custom-header"
          className="custom-class"
        >
          Name
        </DataTableSortableHeader>,
      );

      const headerCell = screen.getByTestId("custom-header");
      expect(headerCell).toHaveClass("custom-class");
    });
  });

  describe("when not sortable (missing direction or onSort)", () => {
    it("renders as a regular header cell when direction is undefined", () => {
      render(<DataTableSortableHeader>Name</DataTableSortableHeader>);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("renders as a regular header cell when onSort is undefined", () => {
      render(
        <DataTableSortableHeader direction={SortDirection.ascending}>
          Name
        </DataTableSortableHeader>,
      );

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("renders as a regular header cell when both direction and onSort are undefined", () => {
      render(<DataTableSortableHeader>Name</DataTableSortableHeader>);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("passes through additional props to the underlying cell", () => {
      render(
        <DataTableSortableHeader
          data-testid="custom-header"
          className="custom-class"
        >
          Name
        </DataTableSortableHeader>,
      );

      const headerCell = screen.getByTestId("custom-header");
      expect(headerCell).toHaveClass("custom-class");
    });
  });

  describe("children rendering", () => {
    it("renders text children", () => {
      render(
        <DataTableSortableHeader
          direction={SortDirection.ascending}
          onSort={mockOnSort}
        >
          Column Name
        </DataTableSortableHeader>,
      );

      expect(screen.getByText("Column Name")).toBeInTheDocument();
    });

    it("renders complex children", () => {
      render(
        <DataTableSortableHeader
          direction={SortDirection.ascending}
          onSort={mockOnSort}
        >
          <span data-testid="custom-content">Custom Content</span>
        </DataTableSortableHeader>,
      );

      expect(screen.getByTestId("custom-content")).toBeInTheDocument();
      expect(screen.getByText("Custom Content")).toBeInTheDocument();
    });
  });
});
