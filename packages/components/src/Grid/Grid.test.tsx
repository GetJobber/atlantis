import React from "react";
import { render, screen } from "@testing-library/react";
import { GRID_TEST_ID, Grid } from ".";
import alignments from "./GridAlign.module.css";
import { spaceTokens } from "../sharedHelpers/getMappedAtlantisSpaceToken";

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
    expect(element).toHaveClass("grid start");
  });

  describe("gap", () => {
    it("should have default gap spacing when gap is true", () => {
      render(<Grid>{children}</Grid>);
      const element = screen.getByTestId(GRID_TEST_ID);
      expect(element).toHaveStyle({ gap: spaceTokens.base });
    });

    it("should have no gap when gap is false", () => {
      render(<Grid gap={false}>{children}</Grid>);
      const element = screen.getByTestId(GRID_TEST_ID);
      expect(element).not.toHaveStyle({ gap: expect.any(String) });
    });

    it("should use custom gap spacing when provided a token", () => {
      render(<Grid gap="small">{children}</Grid>);
      const element = screen.getByTestId(GRID_TEST_ID);
      expect(element).toHaveStyle({ gap: spaceTokens.small });
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
