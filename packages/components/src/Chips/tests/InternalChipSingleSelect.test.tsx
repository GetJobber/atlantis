import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InternalChipSingleSelect } from "../InternalChipSingleSelect";
import { Chip } from "../../Chip";

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

describe("onChange", () => {
  it("should trigger the onChange selecting a chip", () => {
    const target = chips[1];
    userEvent.click(screen.getByText(target));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveReturnedWith(target);
  });
});
