import React from "react";
import { render, screen } from "@testing-library/react";
import { DataListHeader } from "./DataListHeader";
import { useDataListContext } from "../../context/DataListContext";
import { useBatchSelect } from "../../hooks/useBatchSelect";
import { useActiveLayout } from "../../hooks/useActiveLayout";
import { useResponsiveSizing } from "../../hooks/useResponsiveSizing";

// Mock the hooks
jest.mock("../../context/DataListContext", () => ({
  useDataListContext: jest.fn(),
}));

jest.mock("../../hooks/useBatchSelect", () => ({
  useBatchSelect: jest.fn(),
}));

jest.mock("../../hooks/useActiveLayout", () => ({
  useActiveLayout: jest.fn(),
}));

jest.mock("../../hooks/useResponsiveSizing", () => ({
  useResponsiveSizing: jest.fn(),
}));

describe("DataListHeader", () => {
  const mockUseDataListContext = useDataListContext as jest.Mock;
  const mockUseBatchSelect = useBatchSelect as jest.Mock;
  const mockUseActiveLayout = useActiveLayout as jest.Mock;
  const mockUseResponsiveSizing = useResponsiveSizing as jest.Mock;

  const mockLayout = jest.fn(data => (
    <div data-testid="mock-header">{data.label}</div>
  ));
  const mockHeaders = { label: "Test Header" };

  beforeEach(() => {
    // Default mock settings
    mockUseResponsiveSizing.mockReturnValue({ xs: true });

    mockUseDataListContext.mockReturnValue({
      headerVisibility: { xs: true, sm: true, md: true, lg: true, xl: true },
      headers: mockHeaders,
      layoutBreakpoints: ["xs"],
      data: [{ id: 1 }, { id: 2 }],
      selected: [],
    });

    mockUseBatchSelect.mockReturnValue({
      hasAtLeastOneSelected: false,
      canSelect: false,
      canSelectAll: false,
    });

    mockUseActiveLayout.mockReturnValue({
      layout: mockLayout,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("when headerVisibility is true", () => {
    it("should render the header when layout is defined", () => {
      render(<DataListHeader />);
      expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    });

    it("should render header when layout is defined and no items are selected", () => {
      mockUseBatchSelect.mockReturnValue({
        hasAtLeastOneSelected: false,
        canSelect: true,
        canSelectAll: true,
      });

      render(<DataListHeader />);
      expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    });

    it("should render header when no items are selected and selection is disabled", () => {
      mockUseBatchSelect.mockReturnValue({
        hasAtLeastOneSelected: false,
        canSelect: false,
        canSelectAll: false,
      });

      render(<DataListHeader />);
      expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    });

    it("should not render when layout is undefined", () => {
      mockUseActiveLayout.mockReturnValue({ layout: undefined });

      render(<DataListHeader />);
      expect(screen.queryByTestId("mock-header")).not.toBeInTheDocument();
    });
  });

  describe("when headerVisibility is false", () => {
    beforeEach(() => {
      mockUseDataListContext.mockReturnValue({
        headerVisibility: {
          xs: false,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
        headers: mockHeaders,
        layoutBreakpoints: ["xs"],
      });
    });

    it("should not render when no items are selected and selection is disabled", () => {
      mockUseBatchSelect.mockReturnValue({
        hasAtLeastOneSelected: false,
        canSelect: false,
        canSelectAll: false,
      });

      render(<DataListHeader />);
      expect(screen.queryByTestId("mock-header")).not.toBeInTheDocument();
    });

    it("should not render when no items are selected, selection is enabled but canSelectAll is false", () => {
      mockUseBatchSelect.mockReturnValue({
        hasAtLeastOneSelected: false,
        canSelect: true,
        canSelectAll: false,
      });

      render(<DataListHeader />);
      expect(screen.queryByTestId("mock-header")).not.toBeInTheDocument();
    });

    it("should render when at least one item is selected", () => {
      mockUseBatchSelect.mockReturnValue({
        hasAtLeastOneSelected: true,
        canSelect: false,
        canSelectAll: false,
      });

      render(<DataListHeader />);
      expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    });

    it("should not render when no items selected even if selection is enabled and canSelectAll is true", () => {
      mockUseBatchSelect.mockReturnValue({
        hasAtLeastOneSelected: false,
        canSelect: true,
        canSelectAll: true,
      });

      render(<DataListHeader />);
      expect(screen.queryByTestId("mock-header")).not.toBeInTheDocument();
    });

    it("should not render when layout is undefined regardless of selection state", () => {
      mockUseActiveLayout.mockReturnValue({ layout: undefined });
      mockUseBatchSelect.mockReturnValue({
        hasAtLeastOneSelected: true,
        canSelect: true,
        canSelectAll: true,
      });

      render(<DataListHeader />);
      expect(screen.queryByTestId("mock-header")).not.toBeInTheDocument();
    });
  });

  describe("with different responsive sizes", () => {
    it("should use the first available breakpoint when current size is not in headerVisibility", () => {
      // Mock a scenario where we're at a medium breakpoint but only small is defined in visibility
      mockUseResponsiveSizing.mockReturnValue({
        xs: false,
        sm: false,
        md: true,
      });
      mockUseDataListContext.mockReturnValue({
        headerVisibility: { xs: true, sm: true }, // Only xs and sm defined
        headers: mockHeaders,
        layoutBreakpoints: ["xs", "sm", "md"],
      });

      render(<DataListHeader />);
      expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    });

    it("should respect headerVisibility for the current breakpoint", () => {
      // Set medium breakpoint to false in visibility
      mockUseResponsiveSizing.mockReturnValue({
        xs: false,
        sm: false,
        md: true,
      });
      mockUseDataListContext.mockReturnValue({
        headerVisibility: { xs: true, sm: true, md: false },
        headers: mockHeaders,
        layoutBreakpoints: ["xs", "sm", "md"],
      });

      render(<DataListHeader />);
      expect(screen.queryByTestId("mock-header")).not.toBeInTheDocument();
    });
  });
});
