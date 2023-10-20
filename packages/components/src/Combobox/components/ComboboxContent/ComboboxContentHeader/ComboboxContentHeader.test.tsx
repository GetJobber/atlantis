import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ComboboxContentHeader } from "./ComboboxContentHeader";

describe("ComboboxContentHeader", () => {
  describe("When no options have been selected", () => {
    it("should render a button that is labelled 'Select all'", () => {
      const onClearAll = jest.fn();
      const onSelectAll = jest.fn();
      const { getByText } = render(
        <ComboboxContentHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={0}
          hasOptionsVisible
        />,
      );

      expect(getByText("Select all")).toBeInTheDocument();
    });

    it("should render a label 'Select {subjectNoun}' when subjectNoun is provided", () => {
      const onClearAll = jest.fn();
      const onSelectAll = jest.fn();
      const { getByText } = render(
        <ComboboxContentHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={0}
          subjectNoun="tax rates"
          hasOptionsVisible
        />,
      );

      expect(getByText("Select tax rates")).toBeInTheDocument();
    });

    it("should render a label 'Select' when subjectNoun is not provided", () => {
      const onClearAll = jest.fn();
      const onSelectAll = jest.fn();
      const { getByText } = render(
        <ComboboxContentHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={0}
          hasOptionsVisible
        />,
      );

      expect(getByText("Select")).toBeInTheDocument();
    });

    it("should call onSelectAll when the 'Select all' button is clicked", () => {
      const onClearAll = jest.fn();
      const onSelectAll = jest.fn();
      const { getByText } = render(
        <ComboboxContentHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={0}
          hasOptionsVisible
        />,
      );

      fireEvent.click(getByText("Select all"));

      expect(onSelectAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("When one or more options are selected", () => {
    it("should render a button that is labelled 'Clear'", () => {
      const onClearAll = jest.fn();
      const onSelectAll = jest.fn();
      const { getByText } = render(
        <ComboboxContentHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={1}
          hasOptionsVisible
        />,
      );

      expect(getByText("Clear")).toBeInTheDocument();
    });

    it("should render a label '{selectedCount} selected'", () => {
      const onClearAll = jest.fn();
      const onSelectAll = jest.fn();
      const { getByText } = render(
        <ComboboxContentHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={3}
          hasOptionsVisible
        />,
      );

      expect(getByText("3 selected")).toBeInTheDocument();
    });

    it("should call onClearAll when the 'Clear' button is clicked", () => {
      const onClearAll = jest.fn();
      const onSelectAll = jest.fn();
      const { getByText } = render(
        <ComboboxContentHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={4}
          hasOptionsVisible
        />,
      );

      fireEvent.click(getByText("Clear"));

      expect(onClearAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("When no options are visible", () => {
    it("should not render a button in the header when no selections have been made", () => {
      const onClearAll = jest.fn();
      const onSelectAll = jest.fn();
      const { queryByText } = render(
        <ComboboxContentHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={0}
          hasOptionsVisible={false}
        />,
      );

      expect(queryByText("Select all")).not.toBeInTheDocument();
      expect(queryByText("Clear")).not.toBeInTheDocument();
    });

    it("should render a button that is labelled 'Clear' when one or more selections have already been made", () => {
      const onClearAll = jest.fn();
      const onSelectAll = jest.fn();
      const { getByText } = render(
        <ComboboxContentHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={1}
          hasOptionsVisible={false}
        />,
      );

      expect(getByText("Clear")).toBeInTheDocument();
    });
  });
});
