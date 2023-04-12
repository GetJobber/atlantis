import React from "react";
import { render, screen } from "@testing-library/react";
import { GLIMMER_TEST_ID, Glimmer, Shapes, Sizes, Timings } from "./Glimmer";

describe("Glimmer", () => {
  it("should render with the defaults", () => {
    render(<Glimmer />);
    const element = screen.getByTestId(GLIMMER_TEST_ID);

    expect(element).toHaveClass("glimmer");
    expect(element).toHaveClass("base");
    expect(element).toHaveClass("rectangle");
  });

  it("should have an aria busy", () => {
    render(<Glimmer />);
    const element = screen.getByTestId(GLIMMER_TEST_ID);

    expect(element).toHaveAttribute("aria-busy", "true");
  });

  describe("Shape", () => {
    it.each<[Shapes]>([
      ["rectangle"],
      ["rectangleShort"],
      ["rectangleShorter"],
      ["square"],
      ["circle"],
    ])("should render a $s", expectedShape => {
      render(<Glimmer shape={expectedShape} />);
      const element = screen.getByTestId(GLIMMER_TEST_ID);
      expect(element).toHaveClass(expectedShape);
    });
  });

  describe("Size", () => {
    it.each<[Sizes]>([
      ["small"],
      ["base"],
      ["large"],
      ["larger"],
      ["largest"],
      ["auto"],
    ])("should render as $s", expectedSize => {
      render(<Glimmer timing="fast" size={expectedSize} />);
      const element = screen.getByTestId(GLIMMER_TEST_ID);
      expect(element).toHaveClass(expectedSize);
    });
  });

  describe("Timing", () => {
    it.each<[Timings]>([["base"], ["fast"]])(
      "should render as $s",
      expectedTimings => {
        render(<Glimmer timing={expectedTimings} size={"auto"} />);
        const element = screen.getByTestId(GLIMMER_TEST_ID);
        expect(element).toHaveClass(expectedTimings);
      },
    );
  });
});
