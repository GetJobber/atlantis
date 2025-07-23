import React from "react";
import { render, screen } from "@testing-library/react";
import noop from "lodash/noop";
import { ComboboxOption } from "./ComboboxOption";
import { ComboboxOptionProps } from "../../Combobox.types";
import {
  ComboboxContextProvider,
  ComboboxProviderProps,
} from "../../ComboboxProvider";

export function renderOption({
  id,
  label,
  customRender,
  selected,
  onSelect = noop,
  onClick,
}: {
  id: string | number;
  label: string;
  customRender?: ComboboxOptionProps["customRender"];
  selected: ComboboxOptionProps[];
  onSelect?: ComboboxProviderProps["selectionHandler"];
  onClick?: ComboboxOptionProps["onClick"];
}) {
  return render(
    <ComboboxContextProvider
      handleOpen={noop}
      handleClose={noop}
      selected={selected}
      open={true}
      shouldScroll={{ current: false }}
      selectionHandler={onSelect}
      searchValue=""
    >
      <ComboboxOption
        label={label}
        id={id}
        customRender={customRender}
        onClick={onClick}
      />
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

export function queryListItem() {
  return screen.queryByRole("option");
}

export const customRender: ComboboxOptionProps["customRender"] = ({
  id,
  label,
  isSelected,
}) => {
  return (
    <div>
      <div>{id}</div>
      <div>{label}</div>
      {isSelected && "✅"}
    </div>
  );
};
