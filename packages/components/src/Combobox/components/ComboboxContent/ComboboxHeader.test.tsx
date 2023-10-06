import React from "react";
import { render } from "@testing-library/react";
import { ComboboxHeader } from "./ComboboxHeader";

describe("ComboboxHeader", () => {
  describe("When no options have been selected", () => {
    it("should render a button with the correct label", () => {
      const { getByText } = render(<ComboboxHeader selectedCount={0} />);

      expect(getByText("Select all")).toBeInTheDocument();
    });

    it("should render the correct label when subjectNoun is provided", () => {
      const { getByText } = render(
        <ComboboxHeader selectedCount={0} subjectNoun="tax rates" />,
      );

      expect(getByText("Select tax rates")).toBeInTheDocument();
    });
  });

  describe("When one or more options has been selected", () => {
    it("should render a button with the correct label", () => {
      const { getByText } = render(<ComboboxHeader selectedCount={1} />);

      expect(getByText("Clear")).toBeInTheDocument();
    });

    it("should render the correct label", () => {
      const { getByText } = render(<ComboboxHeader selectedCount={1} />);

      expect(getByText("1 selected")).toBeInTheDocument();
    });
  });
});
