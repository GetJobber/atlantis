import React from "react";
import { render, screen } from "@testing-library/react";
import { GRID_TEST_ID, Grid } from ".";
import alignments from "./GridAlign.module.css";

const children = [
  <Grid.Cell key="1" size={{ xs: 12, sm: 8, md: 6, lg: 4, xl: 3 }}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur
    doloribus maiores dignissimos animi minus non debitis aperiam molestiae quod
    temporibus?
  </Grid.Cell>,
  <Grid.Cell key="2" size={{ xs: 12, sm: 4, md: 6, lg: 8, xl: 7 }}>
    Hello There
  </Grid.Cell>,
];

describe("Grid", () => {
  it("should render a grid with the correct default class names", () => {
    render(<Grid>{children}</Grid>);
    const element = screen.getByTestId(GRID_TEST_ID);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("grid gap start");
  });

  describe("gap", () => {
    it("should have a gap by default", () => {
      render(<Grid>{children}</Grid>);
      const element = screen.getByTestId(GRID_TEST_ID);
      expect(element).toHaveClass("gap");
    });

    it("should not have a gap when set", () => {
      render(<Grid gap={false}>{children}</Grid>);
      const element = screen.getByTestId(GRID_TEST_ID);
      expect(element).not.toHaveClass("gap");
    });
  });

  describe("align", () => {
    it.each<[keyof typeof alignments]>([
      ["center"],
      ["start"],
      ["end"],
      ["stretch"],
    ])("should render %s", expectedAlign => {
      render(<Grid alignItems={expectedAlign}>{children}</Grid>);
      const element = screen.getByTestId(GRID_TEST_ID);
      expect(element).toHaveClass(expectedAlign);
    });
  });
});
