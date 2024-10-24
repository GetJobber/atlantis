import React from "react";
import { render, screen } from "@testing-library/react";
import { ComboboxOption } from "./ComboboxOption";
import { ComboboxOptionProps } from "../../Combobox.types";
import { ComboboxContextProvider } from "../../ComboboxProvider";

export function renderOption(
  id: string | number,
  label: string,
  selected: ComboboxOptionProps[],
  onSelect = jest.fn(),
) {
  return render(
    <ComboboxContextProvider
      toggleOpen={jest.fn()}
      handleClose={jest.fn()}
      selected={selected}
      open={true}
      shouldScroll={{ current: false }}
      selectionHandler={onSelect}
      searchValue=""
    >
      <ComboboxOption label={label} id={id} />
    </ComboboxContextProvider>,
  );
}

export function getOption(label: string) {
  return screen.getByText(label).parentElement as HTMLElement;
}

export function getCheckmark() {
  return screen.getByTestId("checkmark");
}

export function queryCheckmark() {
  return screen.queryByTestId("checkmark");
}
