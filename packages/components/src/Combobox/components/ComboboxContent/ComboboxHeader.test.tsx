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
          searchValue=""
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
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
          searchValue=""
          options={[]}
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
          searchValue=""
          options={[]}
        />,
      );

      expect(getByText("Select")).toBeInTheDocument();
    });

    it("should call onSelectAll when the 'Select all' button is clicked", () => {
      const { getByText } = render(
        <ComboboxHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={0}
          searchValue=""
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
        />,
      );

      fireEvent.click(getByText("Select all"));

      expect(onSelectAll).toHaveBeenCalledTimes(1);
    });

    describe("When the search term matches one or more options", () => {
      it("should render a button that is labelled 'Select all'", () => {
        const { getByText } = render(
          <ComboboxHeader
            onSelectAll={onSelectAll}
            onClearAll={onClearAll}
            selectedCount={0}
            searchValue="Bag"
            options={[
              { id: "1", label: "Bilbo Baggins" },
              { id: "2", label: "Frodo Baggins" },
              { id: "3", label: "Samwise Gamgee" },
            ]}
          />,
        );

        expect(getByText("Select all")).toBeInTheDocument();
      });
    });

    describe("When the search term does not match any options", () => {
      it("should not render a button in the header", () => {
        const { queryByText } = render(
          <ComboboxHeader
            onSelectAll={onSelectAll}
            onClearAll={onClearAll}
            selectedCount={0}
            searchValue="Taylor"
            options={[
              { id: "1", label: "Bilbo Baggins" },
              { id: "2", label: "Frodo Baggins" },
              { id: "3", label: "Samwise Gamgee" },
            ]}
          />,
        );

        expect(queryByText("Select all")).not.toBeInTheDocument();
        expect(queryByText("Clear")).not.toBeInTheDocument();
      });
    });
  });

  describe("When one or more options has been selected", () => {
    it("should render a button that is labelled 'Clear'", () => {
      const { getByText } = render(
        <ComboboxHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={1}
          searchValue=""
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
          ]}
        />,
      );

      expect(getByText("Clear")).toBeInTheDocument();
    });

    it("should render a label '{selectedCount} selected'", () => {
      const { getByText } = render(
        <ComboboxHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={3}
          searchValue=""
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
            { id: "3", label: "Samwise Gamgee" },
            { id: "4", label: "Meriadoc Brandybuck" },
          ]}
        />,
      );

      expect(getByText("3 selected")).toBeInTheDocument();
    });

    it("should call onClearAll when the 'Clear' button is clicked", () => {
      const { getByText } = render(
        <ComboboxHeader
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
          selectedCount={4}
          searchValue=""
          options={[
            { id: "1", label: "Bilbo Baggins" },
            { id: "2", label: "Frodo Baggins" },
            { id: "3", label: "Samwise Gamgee" },
            { id: "4", label: "Meriadoc Brandybuck" },
          ]}
        />,
      );

      fireEvent.click(getByText("Clear"));

      expect(onClearAll).toHaveBeenCalledTimes(1);
    });

    describe("When the search term matches one or more options", () => {
      it("should render a button that is labelled 'Clear'", () => {
        const { getByText } = render(
          <ComboboxHeader
            onSelectAll={onSelectAll}
            onClearAll={onClearAll}
            selectedCount={1}
            searchValue="Bag"
            options={[
              { id: "1", label: "Bilbo Baggins" },
              { id: "2", label: "Frodo Baggins" },
              { id: "3", label: "Samwise Gamgee" },
            ]}
          />,
        );

        expect(getByText("Clear")).toBeInTheDocument();
      });
    });

    describe("When the search term does not match any options", () => {
      it("should render a button that is labelled 'Clear'", () => {
        const { getByText } = render(
          <ComboboxHeader
            onSelectAll={onSelectAll}
            onClearAll={onClearAll}
            selectedCount={1}
            searchValue="Taylor"
            options={[
              { id: "1", label: "Bilbo Baggins" },
              { id: "2", label: "Frodo Baggins" },
              { id: "3", label: "Samwise Gamgee" },
            ]}
          />,
        );

        expect(getByText("Clear")).toBeInTheDocument();
      });
    });
  });
});
