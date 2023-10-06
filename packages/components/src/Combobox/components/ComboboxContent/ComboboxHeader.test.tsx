import React from "react";
import { render } from "@testing-library/react";
import { ComboboxHeader } from "./ComboboxHeader";
import { ComboboxContext } from "../../ComboboxProvider";

describe("ComboboxHeader", () => {
  describe("When no options have been selected", () => {
    it("should render a button with the correct label", () => {
      const { getByText } = render(
        <MockComboboxProvider>
          <ComboboxHeader selectedCount={0} />
        </MockComboboxProvider>,
      );

      expect(getByText("Select all")).toBeInTheDocument();
    });

    it("should render the correct label when subjectNoun is provided", () => {
      const { getByText } = render(
        <MockComboboxProvider>
          <ComboboxHeader selectedCount={0} subjectNoun="tax rates" />
        </MockComboboxProvider>,
      );

      expect(getByText("Select tax rates")).toBeInTheDocument();
    });
  });

  describe("When one or more options has been selected", () => {
    it("should render a button with the correct label", () => {
      const { getByText } = render(
        <MockComboboxProvider>
          <ComboboxHeader selectedCount={1} />
        </MockComboboxProvider>,
      );

      expect(getByText("Clear")).toBeInTheDocument();
    });

    it("should render the correct label", () => {
      const { getByText } = render(
        <MockComboboxProvider>
          <ComboboxHeader selectedCount={1} />
        </MockComboboxProvider>,
      );

      expect(getByText("1 selected")).toBeInTheDocument();
    });
  });
});

function MockComboboxProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <ComboboxContext.Provider
      value={{
        multiselect: true,
        open,
        setOpen,
        wrapperRef: { current: null },
      }}
    >
      {children}
    </ComboboxContext.Provider>
  );
}
