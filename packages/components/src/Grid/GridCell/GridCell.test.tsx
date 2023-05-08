import React from "react";
import { render, screen } from "@testing-library/react";
import { GRID_CELL_TEST_ID, GridCell } from ".";

describe("GridCell", () => {
  it("should add a css variable inline styling", () => {
    render(
      <GridCell size={{ xs: 12, sm: 10, md: 8, lg: 6, xl: 4 }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur
        doloribus maiores dignissimos animi minus non debitis aperiam molestiae
        quod temporibus?
      </GridCell>,
    );

    const element = screen.getByTestId(GRID_CELL_TEST_ID);
    expect(element).toBeInTheDocument();

    expect(getCssVar("--gridCell--size-xs")).toBe("12");
    expect(getCssVar("--gridCell--size-sm")).toBe("10");
    expect(getCssVar("--gridCell--size-md")).toBe("8");
    expect(getCssVar("--gridCell--size-lg")).toBe("6");
    expect(getCssVar("--gridCell--size-xl")).toBe("4");
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
