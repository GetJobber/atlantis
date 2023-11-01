import { render } from "@testing-library/react";
import React from "react";
import { ComboboxContent } from "./ComboboxContent";
import { ComboboxContextProvider } from "../../ComboboxProvider";
import { ComboboxOption } from "../../Combobox.types";

const setOpen = jest.fn();
const setSelected = jest.fn();
const handleSelect = jest.fn();
const setSearchValue = jest.fn();
const handleClose = jest.fn();

afterEach(() => {
  setOpen.mockClear();
  setSelected.mockClear();
  setSearchValue.mockClear();
  handleSelect.mockClear();
  handleClose.mockClear();
});

describe("ComboboxContent Header", () => {
  describe("when multiSelect is true", () => {
    it("should render when options exist", () => {
      const { getByText, getByTestId } = renderComboboxContent(
        [
          { id: 1, label: "Han Solo" },
          { id: 2, label: "Chewbacca" },
        ],
        [],
        true,
      );

      expect(getByText("Select all")).toBeInTheDocument();
      expect(getByTestId("ATL-Combobox-Header")).toBeInTheDocument();
    });

    it("should not render when no options exist", () => {
      const { queryByText, queryByTestId } = renderComboboxContent(
        [],
        [],
        true,
      );

      expect(queryByText("Select all")).not.toBeInTheDocument();
      expect(queryByTestId("ATL-Combobox-Header")).not.toBeInTheDocument();
    });
  });

  describe("when multiSelect is false", () => {
    it("should not render when options exist", () => {
      const { queryByTestId } = renderComboboxContent(
        [
          { id: 1, label: "Han Solo" },
          { id: 2, label: "Chewbacca" },
        ],
        [],
        false,
      );

      expect(queryByTestId("ATL-Combobox-Header")).not.toBeInTheDocument();
    });

    it("should not render when options do not exist", () => {
      const { queryByTestId } = renderComboboxContent([], [], false);

      expect(queryByTestId("ATL-Combobox-Header")).not.toBeInTheDocument();
    });
  });
});

function renderComboboxContent(
  options: ComboboxOption[] = [],
  selected: ComboboxOption[] = [],
  multiSelect = false,
  open = true,
  searchValue = "",
) {
  return render(
    <ComboboxContextProvider
      setOpen={setOpen}
      handleClose={handleClose}
      selectionHandler={handleSelect}
      multiselect={multiSelect}
      shouldScroll={{ current: false }}
      open={open}
      selected={selected}
    >
      <ComboboxContent
        selected={selected}
        selectedStateSetter={setSelected}
        handleSelection={handleSelect}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        wrapperRef={{ current: null }}
        open={open}
        setOpen={setOpen}
        options={options}
        multiselect={multiSelect}
      />
    </ComboboxContextProvider>,
  );
}
