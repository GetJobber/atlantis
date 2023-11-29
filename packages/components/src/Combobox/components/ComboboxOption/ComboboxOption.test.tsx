import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComboboxOption as ComboboxOptionComponent } from "./ComboboxOption";
import { ComboboxContextProvider } from "../../ComboboxProvider";
import { ComboboxOption } from "../../Combobox.types";

const onSelect = jest.fn();

afterEach(() => {
  onSelect.mockClear();
});

describe("ComboboxOption", () => {
  describe("when option is selected", () => {
    it("should have a checkmark", () => {
      const { getByTestId } = renderOption("1", "Michael", [
        { id: "1", label: "Michael" },
      ]);

      expect(getByTestId("checkmark")).toBeInTheDocument();
    });

    it("should have selected attributes", () => {
      const { getByText } = renderOption("1", "Michael", [
        { id: "1", label: "Michael" },
      ]);

      expect(getByText("Michael")).toHaveAttribute("aria-selected", "true");
      expect(getByText("Michael")).toHaveAttribute("data-selected", "true");
    });

    it("should call selectionHandler when clicked", async () => {
      const { getByText } = renderOption("1", "Michael", [
        { id: "1", label: "Michael" },
      ]);

      await userEvent.click(getByText("Michael"));

      expect(onSelect).toHaveBeenCalled();
    });

    describe("id type insensitivity", () => {
      it("should correctly evaluate if selected is a string and option is a number", () => {
        const { getByText } = renderOption("1", "Michael", [
          { id: 1, label: "Michael" },
        ]);

        expect(getByText("Michael")).toHaveAttribute("aria-selected", "true");
        expect(getByText("Michael")).toHaveAttribute("data-selected", "true");
      });
      it("should correctly evaluate if selected is a number and option is a number", () => {
        const { getByText } = renderOption(1, "Michael", [
          { id: 1, label: "Michael" },
        ]);

        expect(getByText("Michael")).toHaveAttribute("aria-selected", "true");
        expect(getByText("Michael")).toHaveAttribute("data-selected", "true");
      });
    });
  });

  describe("when option is not selected", () => {
    it("should not have a checkmark", () => {
      const { queryByTestId } = renderOption("1", "Michael", []);

      expect(queryByTestId("checkmark")).not.toBeInTheDocument();
    });

    it("should not have selected attributes", () => {
      const { getByText } = renderOption("1", "Michael", []);

      expect(getByText("Michael")).toHaveAttribute("aria-selected", "false");
      expect(getByText("Michael")).toHaveAttribute("data-selected", "false");
    });

    it("should call selectionHandler when clicked", async () => {
      const { getByText } = renderOption("1", "Michael", []);

      await userEvent.click(getByText("Michael"));

      expect(onSelect).toHaveBeenCalled();
    });
  });
});

function renderOption(
  id: string | number,
  label: string,
  selected: ComboboxOption[],
) {
  return render(
    <ComboboxContextProvider
      setOpen={jest.fn()}
      handleClose={jest.fn()}
      selected={selected}
      open={true}
      shouldScroll={{ current: false }}
      selectionHandler={onSelect}
    >
      <ComboboxOptionComponent label={label} id={id} />
    </ComboboxContextProvider>,
  );
}
