import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTablePaginationButton } from "../DataTablePaginationButton";

describe("DataTablePaginationButton", () => {
  const mockOnClick = jest.fn();
  const mockAriaLabel = jest.fn(
    (direction: "previous" | "next") => `${direction} page`,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when direction is 'previous'", () => {
    it("renders with left arrow icon", () => {
      render(
        <DataTablePaginationButton
          direction="previous"
          ariaLabel={mockAriaLabel}
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-label", "previous page");
    });

    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      render(
        <DataTablePaginationButton
          direction="previous"
          onClick={mockOnClick}
          ariaLabel={mockAriaLabel}
        />,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("is disabled when disabled prop is true", () => {
      render(
        <DataTablePaginationButton
          direction="previous"
          disabled={true}
          ariaLabel={mockAriaLabel}
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("is enabled by default", () => {
      render(
        <DataTablePaginationButton
          direction="previous"
          ariaLabel={mockAriaLabel}
        />,
      );

      const button = screen.getByRole("button");
      expect(button).not.toBeDisabled();
    });
  });

  describe("when direction is 'next'", () => {
    it("renders with right arrow icon", () => {
      render(
        <DataTablePaginationButton
          direction="next"
          ariaLabel={mockAriaLabel}
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-label", "next page");
    });

    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      render(
        <DataTablePaginationButton
          direction="next"
          onClick={mockOnClick}
          ariaLabel={mockAriaLabel}
        />,
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("is disabled when disabled prop is true", () => {
      render(
        <DataTablePaginationButton
          direction="next"
          disabled={true}
          ariaLabel={mockAriaLabel}
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("ariaLabel function", () => {
    it("calls ariaLabel function with correct direction", () => {
      const customAriaLabel = jest.fn(
        (direction: "previous" | "next") => `Go to ${direction} page`,
      );

      render(
        <DataTablePaginationButton
          direction="next"
          ariaLabel={customAriaLabel}
        />,
      );

      expect(customAriaLabel).toHaveBeenCalledWith("next");
    });

    it("uses the returned aria-label", () => {
      const customAriaLabel = jest.fn(
        (direction: "previous" | "next") => `Custom ${direction} label`,
      );

      render(
        <DataTablePaginationButton
          direction="previous"
          ariaLabel={customAriaLabel}
        />,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom previous label");
    });
  });
});
