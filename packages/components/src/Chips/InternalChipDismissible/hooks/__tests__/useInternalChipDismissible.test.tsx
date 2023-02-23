import React, { MouseEvent } from "react";
import { renderHook } from "@testing-library/react";
import { useInternalChipDismissible } from "..";
import { Chip } from "../../..";

const handleChange = jest.fn(value => value);
const handleClickChip = jest.fn((_, value) => value);
const handleCustomAddition = jest.fn(value => value);

const chips = ["Amazing", "Fabulous", "Magical"];
const selectedChips = ["Amazing"];

const hookParams = {
  children: chips.map(chip => <Chip key={chip} label={chip} value={chip} />),
  selected: selectedChips,
  onChange: handleChange,
  onClick: handleClickChip,
  onCustomAdd: handleCustomAddition,
};

function setupHook(params?: Partial<typeof hookParams>) {
  const {
    result: { current },
  } = renderHook(() =>
    useInternalChipDismissible({ ...hookParams, ...params }),
  );
  return current;
}

describe("sortedVisibleChipOptions", () => {
  it("should return a list of values in order that was specified", () => {
    const specifiedOrder = [chips[2], chips[0], chips[1]];
    const { sortedVisibleChipOptions } = setupHook({
      selected: specifiedOrder,
    });

    sortedVisibleChipOptions.forEach((option, index) => {
      expect(option.value).toBe(specifiedOrder[index]);
    });
  });
});

describe("availableChipOptions", () => {
  it("should not return the selected value on the options", () => {
    const { availableChipOptions } = setupHook();
    const selected = availableChipOptions.filter(option => {
      selectedChips.includes(option.value);
    });

    expect(selected).toHaveLength(0);
  });
});

describe("handleChipRemove", () => {
  it("should return a function", () => {
    const { sortedVisibleChipOptions, handleChipRemove } = setupHook();
    expect(handleChipRemove(sortedVisibleChipOptions[0].label)).toEqual(
      expect.any(Function),
    );
  });

  it("should return remove the selected chip", () => {
    const { sortedVisibleChipOptions, handleChipRemove } = setupHook();
    handleChipRemove(sortedVisibleChipOptions[0].label)();
    expect(handleChange).toHaveBeenCalledWith([]);
  });
});

describe("handleChipAdd", () => {
  it("should fire the onChange callback with a new value", () => {
    const { handleChipAdd } = setupHook();
    const addedId = chips[1];
    handleChipAdd(addedId);
    expect(handleChange).toHaveBeenCalledWith([...selectedChips, addedId]);
  });
});

describe("handleCustomAdd", () => {
  it("should fire the onChange callback with a new value", () => {
    const { handleCustomAdd } = setupHook();
    const selectedId = chips[1];
    handleCustomAdd(selectedId);
    expect(handleCustomAddition).toHaveBeenCalledWith(selectedId);
  });
});

describe("handleChipClick", () => {
  it("should return a function", () => {
    const { handleChipClick } = setupHook();
    expect(handleChipClick(chips[0])).toEqual(expect.any(Function));
  });

  it("should return the event and the ID of what you clicked", () => {
    const { handleChipClick } = setupHook();
    const clickedId = chips[1];
    handleChipClick(clickedId)({} as MouseEvent<HTMLButtonElement>);
    expect(handleClickChip).toHaveBeenCalledWith(expect.any(Object), clickedId);
  });
});
