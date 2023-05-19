import React from "react";
import { render, screen } from "@testing-library/react";
import { GRID_CELL_TEST_ID, InternalGridCell } from ".";

describe("GridCell", () => {
  it("should add a css variable inline styling", () => {
    render(
      <InternalGridCell size={{ xs: 12, sm: 10, md: 8, lg: 6, xl: 4 }}>
        Even numbers baby!
      </InternalGridCell>,
    );

    const element = screen.getByTestId(GRID_CELL_TEST_ID);
    expect(element).toBeInTheDocument();

    expect(getCssVar("--gridCell--size-xs")).toBe("12");
    expect(getCssVar("--gridCell--size-sm")).toBe("10");
    expect(getCssVar("--gridCell--size-md")).toBe("8");
    expect(getCssVar("--gridCell--size-lg")).toBe("6");
    expect(getCssVar("--gridCell--size-xl")).toBe("4");
  });

  describe("Inferred sizing", () => {
    it("should set xs as 12 if it's not declared", () => {
      render(
        <InternalGridCell size={{ sm: 2 }}>No XS for you!</InternalGridCell>,
      );

      expect(getCssVar("--gridCell--size-xs")).toBe("12");
      expect(getCssVar("--gridCell--size-sm")).toBe("2");
    });

    it("should use the previous value for sizing", () => {
      render(
        <InternalGridCell size={{ xs: 6, md: 7 }}>
          Size me from prev
        </InternalGridCell>,
      );

      expect(getCssVar("--gridCell--size-xs")).toBe("6");
      expect(getCssVar("--gridCell--size-sm")).toBe("6");
      expect(getCssVar("--gridCell--size-md")).toBe("7");
      expect(getCssVar("--gridCell--size-lg")).toBe("7");
      expect(getCssVar("--gridCell--size-xl")).toBe("7");
    });

    it("should use xs sizing for all sizing when only xs is declared", () => {
      render(
        <InternalGridCell size={{ xs: 10 }}>
          You all get a 10!
        </InternalGridCell>,
      );

      expect(getCssVar("--gridCell--size-xs")).toBe("10");
      expect(getCssVar("--gridCell--size-sm")).toBe("10");
      expect(getCssVar("--gridCell--size-md")).toBe("10");
      expect(getCssVar("--gridCell--size-lg")).toBe("10");
      expect(getCssVar("--gridCell--size-xl")).toBe("10");
    });
  });
});

/**
 * `toHaveStyle` throws a "Compared values have no visual difference" error so
 * we gotta go old school
 */
function getCssVar(cssVar: string): string {
  const element = screen.getByTestId(GRID_CELL_TEST_ID);
  return window.getComputedStyle(element).getPropertyValue(cssVar);
}
