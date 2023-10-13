import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ComboboxHeader } from "./ComboboxHeader";

describe("ComboboxHeader", () => {
  const onClearAll = jest.fn();
  const onSelectAll = jest.fn();
  describe("When no options have been selected", () => {
    it("should render a button that is labelled 'Select all'", () => {
      const { getByText } = render(
        <ComboboxHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={0}
        />,
      );

      expect(getByText("Select all")).toBeInTheDocument();
    });

    it("should render a label 'Select {subjectNoun}' when subjectNoun is provided", () => {
      const { getByText } = render(
        <ComboboxHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={0}
          subjectNoun="tax rates"
        />,
      );

      expect(getByText("Select tax rates")).toBeInTheDocument();
    });

    it("should render a label 'Select' when subjectNoun is not provided", () => {
      const { getByText } = render(
        <ComboboxHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={0}
        />,
      );

      expect(getByText("Select")).toBeInTheDocument();
    });

    it("should call onSelectAll when the Select all button is clicked", () => {
      const { getByText } = render(
        <ComboboxHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={0}
        />,
      );

      fireEvent.click(getByText("Select all"));

      expect(onSelectAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("When one or more options has been selected", () => {
    it("should render a button that is labelled 'Clear'", () => {
      const { getByText } = render(
        <ComboboxHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={1}
        />,
      );

      expect(getByText("Clear")).toBeInTheDocument();
    });

    it("should render a label '{selectedCount} selected'", () => {
      const { getByText } = render(
        <ComboboxHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={5}
        />,
      );

      expect(getByText("5 selected")).toBeInTheDocument();
    });

    it("should call onClearAll when the Clear button is clicked", () => {
      const { getByText } = render(
        <ComboboxHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={4}
        />,
      );

      fireEvent.click(getByText("Clear"));

      expect(onClearAll).toHaveBeenCalledTimes(1);
    });
  });
});
