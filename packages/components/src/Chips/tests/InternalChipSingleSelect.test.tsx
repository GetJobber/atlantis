import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "..";
import { InternalChipSingleSelect } from "../InternalChipSingleSelect";

let handleChange: jest.Mock;
let handleClickChip: jest.Mock;
const chips = ["Amazing", "Fabulous", "Magical"];
const selectedChip = "Amazing";

beforeEach(() => {
  handleChange = jest.fn(value => value);
  handleClickChip = jest.fn((_, value) => value);

  render(
    <InternalChipSingleSelect
      selected={selectedChip}
      onChange={handleChange}
      onClick={handleClickChip}
    >
      {chips.map(chip => (
        <Chip key={chip} label={chip} value={chip} />
      ))}
    </InternalChipSingleSelect>,
  );
});

afterEach(cleanup);

it("should have a label and a checkbox", () => {
  const component = screen.getByTestId("singleselect-chips");
  expect(component.querySelectorAll("label")).toHaveLength(chips.length);
  expect(component.querySelectorAll("input[type=radio]")).toHaveLength(
    chips.length,
  );
});

describe("onChange", () => {
  it("should trigger the onChange selecting a chip", () => {
    const target = chips[1];
    userEvent.click(screen.getByLabelText(target));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveReturnedWith(target);
  });

  it("should trigger the onChange deselecting a chip", () => {
    userEvent.click(screen.getByLabelText(selectedChip));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveReturnedWith(undefined);
  });
});

describe("onClick", () => {
  it("should trigger the chip onClick", () => {
    const target = chips[2];
    userEvent.click(screen.getByLabelText(target));
    expect(handleClickChip).toHaveBeenCalledTimes(1);
    expect(handleClickChip).toHaveReturnedWith(target);
  });
});
