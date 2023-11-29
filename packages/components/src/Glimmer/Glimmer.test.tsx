import React from "react";
import { render, screen } from "@testing-library/react";
import {
  GLIMMER_BUTTON_TEST_ID,
  GLIMMER_HEADER_TEST_ID,
  GLIMMER_TEST_ID,
  GLIMMER_TEXT_TEST_ID,
  Glimmer,
  Shapes,
  Sizes,
  Timings,
} from "./Glimmer";

describe("Glimmer", () => {
  it("should render with the defaults", () => {
    render(<Glimmer />);
    const element = screen.getByTestId(GLIMMER_TEST_ID);

    expect(element).toHaveClass("glimmer");
    expect(element).toHaveClass("rectangle");
    expect(element).toHaveClass("base");
    expect(element).not.toHaveClass("reverseTheme");
    const baseClassNames = element.className
      .split(" ")
      .filter(c => c === "base");
    expect(baseClassNames).toHaveLength(2);
  });

  it("should have an aria busy", () => {
    render(<Glimmer />);
    const element = screen.getByTestId(GLIMMER_TEST_ID);

    expect(element).toHaveAttribute("aria-busy", "true");
  });

  it("should reverse the theme", () => {
    render(<Glimmer reverseTheme={true} />);
    expect(screen.getByTestId(GLIMMER_TEST_ID)).toHaveClass("reverseTheme");
  });

  it("should add a width when specified", () => {
    render(<Glimmer width={300} />);
    expect(screen.getByTestId(GLIMMER_TEST_ID)).toHaveStyle({ width: "300px" });
  });

  describe("Shape", () => {
    it.each<[Shapes]>([
      ["rectangle"],
      ["rectangleShort"],
      ["rectangleShorter"],
      ["square"],
      ["circle"],
    ])("should render a %s", expectedShape => {
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
    ])("should render as %s", expectedSize => {
      render(<Glimmer timing="fast" size={expectedSize} />);
      const element = screen.getByTestId(GLIMMER_TEST_ID);
      expect(element).toHaveClass(expectedSize);
    });
  });

  describe("Timing", () => {
    it.each<[Timings]>([["base"], ["fast"]])(
      "should render as %s",
      expectedTimings => {
        render(<Glimmer timing={expectedTimings} size={"auto"} />);
        const element = screen.getByTestId(GLIMMER_TEST_ID);
        expect(element).toHaveClass(expectedTimings);
      },
    );
  });

  describe("Header", () => {
    beforeEach(() => {
      render(<Glimmer.Header />);
    });

    it("should render a wrapping element", () => {
      const element = screen.getByTestId(GLIMMER_HEADER_TEST_ID);
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass("header");
    });

    it("should render a large glimmer by default", () => {
      const element = screen.getByTestId(GLIMMER_TEST_ID);
      expect(element).toHaveClass("large");
    });
  });

  describe("Text", () => {
    it("should render a wrapping element", () => {
      render(<Glimmer.Text />);
      expect(screen.getByTestId(GLIMMER_TEXT_TEST_ID)).toBeInTheDocument();
    });

    it("should add a width on the wrapping element", () => {
      render(<Glimmer.Text width={500} />);
      expect(screen.getByTestId(GLIMMER_TEXT_TEST_ID)).toHaveStyle({
        width: "500px",
      });
    });
  });

  describe("Button", () => {
    it("should render a wrapping element", () => {
      render(<Glimmer.Button />);
      const element = screen.getByTestId(GLIMMER_BUTTON_TEST_ID);
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass("button");
    });
  });
});
