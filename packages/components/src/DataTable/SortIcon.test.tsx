import React from "react";
import { render } from "@testing-library/react";
import { SortDirection, SortIcon } from "./SortIcon";

describe("SortIcon", () => {
  describe("when direction is equilibrium", () => {
    it("renders with no active classes", () => {
      render(<SortIcon direction={SortDirection.equilibrium} />);

      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();

      const upArrow = svg?.querySelector("path:first-child");
      const downArrow = svg?.querySelector("path:last-child");

      expect(upArrow).not.toHaveClass("active");
      expect(upArrow).not.toHaveClass("inactive");
      expect(downArrow).not.toHaveClass("active");
      expect(downArrow).not.toHaveClass("inactive");
    });
  });

  describe("when direction is ascending", () => {
    it("renders with up arrow active and down arrow inactive", () => {
      render(<SortIcon direction={SortDirection.ascending} />);

      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();

      const upArrow = svg?.querySelector("path:first-child");
      const downArrow = svg?.querySelector("path:last-child");

      expect(upArrow).toHaveClass("active");
      expect(downArrow).toHaveClass("inactive");
    });
  });

  describe("when direction is descending", () => {
    it("renders with down arrow active and up arrow inactive", () => {
      render(<SortIcon direction={SortDirection.descending} />);

      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();

      const upArrow = svg?.querySelector("path:first-child");
      const downArrow = svg?.querySelector("path:last-child");

      expect(upArrow).toHaveClass("inactive");
      expect(downArrow).toHaveClass("active");
    });
  });

  describe("SVG structure", () => {
    it("renders two path elements", () => {
      render(<SortIcon direction={SortDirection.ascending} />);

      const svg = document.querySelector("svg");
      const paths = svg?.querySelectorAll("path");
      expect(paths).toHaveLength(2);
    });
  });

  describe("container styling", () => {
    it("renders with sortIcon class", () => {
      render(<SortIcon direction={SortDirection.ascending} />);

      const container = document.querySelector(".sortIcon");
      expect(container).toBeInTheDocument();
    });
  });
});
