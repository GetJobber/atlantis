import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { ComboboxTrigger } from "./ComboboxTrigger";
import { ComboboxContextProvider } from "../../ComboboxProvider";
import { ComboboxOption } from "../../Combobox.types";

const handleClose = jest.fn();
const setOpen = jest.fn();

afterEach(() => {
  handleClose.mockClear();
  setOpen.mockClear();
});

describe("ComboboxTrigger", () => {
  describe("when open is false", () => {
    it("calls setOpen", () => {
      const { getByRole } = renderTrigger();
      const trigger = getByRole("combobox");

      fireEvent.click(trigger);
      expect(setOpen).toHaveBeenCalled();
    });
  });

  describe("when open is true", () => {
    it("calls onClose", () => {
      const { getByRole } = renderTrigger(true);
      const trigger = getByRole("combobox");

      fireEvent.click(trigger);
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it("has role 'combobox'", () => {
    const { getByRole } = renderTrigger();

    expect(getByRole("combobox")).toBeInTheDocument();
  });

  describe("before selection", () => {
    it("renders a ComboboxTrigger with a label", () => {
      const { getByText } = renderTrigger(false, [], "Teammates");

      expect(getByText("Teammates")).toBeInTheDocument();
    });

    it("renders a ComboboxTrigger with a 'Select' label if no label is provided", () => {
      const { getByText } = renderTrigger();

      expect(getByText("Select")).toBeInTheDocument();
    });

    it("renders a Chip with a suffix", () => {
      const { getByTestId } = renderTrigger();

      const suffixIcon = getByTestId("add");

      expect(suffixIcon).toBeInTheDocument();
    });

    it("renders a Chip with 'subtle' variation", () => {
      const { getByRole } = renderTrigger();

      expect(getByRole("combobox")).toHaveClass("subtle");
    });
  });

  describe("after selection", () => {
    afterEach(cleanup);
    it("renders a Chip with 'base' variation", () => {
      const { getByRole } = renderTrigger(true, [
        { id: "1", label: "Michael" },
      ]);

      const trigger = getByRole("combobox");

      expect(trigger).toHaveClass("base");
      expect(trigger).toHaveTextContent("Michael");
    });

    describe("When multiSelect is false", () => {
      it("renders Chip with the selected option as the label", () => {
        const { getByRole } = renderTrigger(
          true,
          [{ id: "1", label: "Michael" }],
          undefined,
          false,
        );

        const trigger = getByRole("combobox");

        expect(trigger).toHaveTextContent("Michael");
      });
    });

    describe("When multiSelect is true", () => {
      it("renders ComboboxTrigger with a label and selected options", () => {
        const { getByRole } = renderTrigger(
          true,
          [
            { id: "1", label: "Michael" },
            { id: "3", label: "Leatherface" },
          ],
          "Teammates",
          true,
        );
        const trigger = getByRole("combobox");

        expect(trigger).toHaveTextContent("Teammates");
        expect(trigger).toHaveTextContent("Michael");
      });

      it("renders ComboboxTrigger with multiple selected options joined by a comma", () => {
        const { getByRole } = renderTrigger(
          true,
          [
            { id: "1", label: "Michael" },
            { id: "3", label: "Leatherface" },
          ],
          undefined,
          true,
        );

        const trigger = getByRole("combobox");

        expect(trigger).toHaveTextContent("Michael, Leatherface");
      });
    });
  });
});

function renderTrigger(
  open = false,
  selected: ComboboxOption[] = [],
  label?: string,
  multiselect = false,
) {
  return render(
    <ComboboxContextProvider
      setOpen={setOpen}
      handleClose={handleClose}
      selected={[]}
      open={open}
      shouldScroll={{ current: false }}
      selectionHandler={jest.fn()}
      multiselect={multiselect}
    >
      <ComboboxTrigger label={label} selected={selected} />
    </ComboboxContextProvider>,
  );
}
