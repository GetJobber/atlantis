import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
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
    it("calls setOpen", async () => {
      renderTrigger();
      const trigger = screen.getByRole("combobox");

      await userEvent.click(trigger);
      expect(setOpen).toHaveBeenCalled();
    });
  });

  describe("when open is true", () => {
    it("calls onClose", async () => {
      renderTrigger(true);
      const trigger = screen.getByRole("combobox");

      await userEvent.click(trigger);
      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe("before selection", () => {
    it("renders a ComboboxTrigger with a label", () => {
      renderTrigger(false, [], "Teammates");

      expect(screen.getByText("Teammates")).toBeInTheDocument();
    });

    it("renders a ComboboxTrigger with a 'Select' label if no label is provided", () => {
      renderTrigger();

      expect(screen.getByText("Select")).toBeInTheDocument();
    });

    it("renders a Chip with a suffix", () => {
      const { getByTestId } = renderTrigger();

      const suffixIcon = getByTestId("add");

      expect(suffixIcon).toBeInTheDocument();
    });

    it("renders a Chip with 'subtle' variation", () => {
      renderTrigger();

      expect(screen.getByRole("combobox")).toHaveClass("subtle");
    });
  });

  describe("after selection", () => {
    afterEach(cleanup);
    it("renders a Chip with 'base' variation", () => {
      renderTrigger(true, [{ id: "1", label: "Michael" }]);

      const trigger = screen.getByRole("combobox");

      expect(trigger).toHaveClass("base");
      expect(trigger).toHaveTextContent("Michael");
    });

    it("renders ComboboxTrigger with a label and selected options", () => {
      renderTrigger(
        true,
        [
          { id: "1", label: "Michael" },
          { id: "3", label: "Leatherface" },
        ],
        "Teammates",
      );
      const trigger = screen.getByRole("combobox");

      expect(trigger).toHaveTextContent("Teammates");
      expect(trigger).toHaveTextContent("Michael");
    });

    it("renders ComboboxTrigger with multiple selected options joined by a comma", () => {
      renderTrigger(
        true,
        [
          { id: "1", label: "Michael" },
          { id: "3", label: "Leatherface" },
        ],
        undefined,
      );

      const trigger = screen.getByRole("combobox");

      expect(trigger).toHaveTextContent("Michael, Leatherface");
    });
  });

  describe("accessibility", () => {
    it("has role 'combobox'", () => {
      renderTrigger();

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("has the label as its accessible name", () => {
      renderTrigger(false, [{ id: "1", label: "Michael" }], "Teammates");

      expect(screen.getByRole("combobox")).toHaveAccessibleName("Teammates");
    });
  });
});

function renderTrigger(
  open = false,
  selected: ComboboxOption[] = [],
  label?: string,
) {
  return render(
    <ComboboxContextProvider
      setOpen={setOpen}
      handleClose={handleClose}
      selected={[]}
      open={open}
      shouldScroll={{ current: false }}
      selectionHandler={jest.fn()}
      searchValue=""
    >
      <ComboboxTrigger label={label} selected={selected} />
    </ComboboxContextProvider>,
  );
}
