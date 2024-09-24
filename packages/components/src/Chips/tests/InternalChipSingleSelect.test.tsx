import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "..";
import { InternalChipSingleSelect } from "../InternalChipSingleSelect";

let handleChange: jest.Mock;
let handleClickChip: jest.Mock;
const chips = ["Amazing", "Fabulous", "Magical"];
const selectedChip = "Amazing";

describe("with hideSuffix false", () => {
  beforeEach(() => {
    handleChange = jest.fn(value => value);
    handleClickChip = jest.fn((_, value) => value);

    renderInternalChipSingleSelect(handleChange, handleClickChip);
  });

  it("should have a label and a checkbox", () => {
    const component = screen.getByTestId("singleselect-chips");
    expect(component.querySelectorAll("label")).toHaveLength(chips.length);
    expect(component.querySelectorAll("input[type=radio]")).toHaveLength(
      chips.length,
    );
  });

  it("should have a checkmark on the selected chip", () => {
    expect(screen.queryAllByTestId("checkmark")).toHaveLength(1);
  });

  describe("onChange", () => {
    it("should trigger the onChange selecting a chip", async () => {
      const target = chips[1];
      await userEvent.click(screen.getByLabelText(target));
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveReturnedWith(target);
    });

    it("should trigger the onChange deselecting a chip", async () => {
      await userEvent.click(screen.getByLabelText(selectedChip));
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveReturnedWith(undefined);
    });
  });

  describe("onClick", () => {
    it("should trigger the chip onClick", async () => {
      const target = chips[2];
      await userEvent.click(screen.getByLabelText(target));
      expect(handleClickChip).toHaveBeenCalledTimes(1);
      expect(handleClickChip).toHaveReturnedWith(target);
    });
  });

  describe("On space bar press", () => {
    it("should deselect the selected chip", async () => {
      const element = within(
        screen.getByLabelText(selectedChip).closest("label"),
      ).getByRole("radio");
      fireEvent.keyUp(element, { key: " " });

      // Wait for next tick
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveReturnedWith(undefined);
      });
    });
  });
});

describe("with hideSuffix true", () => {
  beforeEach(() => {
    handleChange = jest.fn(value => value);
    handleClickChip = jest.fn((_, value) => value);

    renderInternalChipSingleSelect(handleChange, handleClickChip, true);
  });

  it("should not render the suffix icon", () => {
    screen.logTestingPlaygroundURL();
    expect(screen.queryByTestId("checkmark")).toBeNull();
  });
});

function renderInternalChipSingleSelect(
  changeHandler: jest.Mock,
  clickHandler: jest.Mock,
  hideSuffix?: boolean,
) {
  return render(
    <InternalChipSingleSelect
      selected={selectedChip}
      onChange={changeHandler}
      onClick={clickHandler}
      hideSuffix={hideSuffix}
    >
      {chips.map(chip => (
        <Chip key={chip} label={chip} value={chip} />
      ))}
    </InternalChipSingleSelect>,
  );
}
