import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { InternalChipDismissible } from "..";
import { Chip } from "../..";

const handleChange = jest.fn(value => value);
const handleClickChip = jest.fn((_, value) => value);
const handleSearch = jest.fn(value => value);
const handleCustomAdd = jest.fn(value => value);

const chips = ["Amazing", "Fabulous", "Magical"];
const selectedChips = ["Amazing"];

beforeEach(() => {
  render(
    <InternalChipDismissible
      selected={selectedChips}
      onChange={handleChange}
      onCustomAdd={handleCustomAdd}
      onClick={handleClickChip}
      onSearch={handleSearch}
    >
      {chips.map(chip => (
        <Chip key={chip} label={chip} value={chip} />
      ))}
    </InternalChipDismissible>,
  );
});

afterEach(cleanup);

it("should only render the selected chip on the UI", () => {
  const wrapperEl = screen.getByTestId("dismissible-chips");

  selectedChips.forEach(chip => {
    expect(within(wrapperEl).queryByText(chip)).toBeInTheDocument();
  });

  chips
    .filter(chip => !selectedChips.includes(chip))
    .forEach(chip => {
      expect(within(wrapperEl).queryByText(chip)).not.toBeInTheDocument();
    });
});

describe("Open Menu", () => {
  let wrapperEl: HTMLElement;

  beforeEach(() => {
    fireEvent.click(screen.getByLabelText("Add"));
    wrapperEl = screen.getByRole("listbox");
  });

  it("should not render the selected chips on the menu", () => {
    selectedChips.forEach(chip => {
      expect(within(wrapperEl).queryByText(chip)).not.toBeInTheDocument();
    });

    chips
      .filter(chip => !selectedChips.includes(chip))
      .forEach(chip => {
        expect(within(wrapperEl).queryByText(chip)).toBeInTheDocument();
      });
  });

  it("should trigger the onChange callback when you select from available optipns", () => {
    const target = chips[chips.length - 1];
    fireEvent.click(screen.getByText(target));

    expect(handleChange).toHaveBeenCalledWith([...selectedChips, target]);
    expect(handleCustomAdd).not.toHaveBeenCalled();
  });

  it("should trigger the onSearch callback when you type on the input", () => {
    const value = "🌮";
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: value },
    });

    expect(handleSearch).toHaveBeenCalledWith(value);
  });

  it("should only trigger the onCustomAdd callback when you select the custom option", () => {
    const value = "🌮";
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: value },
    });
    fireEvent.click(screen.getByText(value));

    expect(handleCustomAdd).toHaveBeenCalledWith(value);
    expect(handleChange).not.toHaveBeenCalled();
  });
});

it("should trigger the onclick callback when a chip gets clicked", () => {
  const wrapperEl = screen.getByTestId("dismissible-chips");
  fireEvent.click(within(wrapperEl).queryByText(selectedChips[0]));

  expect(handleClickChip).toHaveBeenCalledWith(
    expect.any(Object),
    selectedChips[0],
  );
});
