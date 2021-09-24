import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InternalChipButton } from "../InternalChipButton";

let handleClick: jest.Mock;
let target: HTMLElement;

beforeEach(() => {
  handleClick = jest.fn();
  render(<InternalChipButton icon="home" onClick={handleClick} label="Yo!" />);
  target = screen.getByTestId("remove-chip-button");
});

afterEach(cleanup);

it("should call the onClick action", () => {
  userEvent.click(target);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("should ne focusable", () => {
  target.focus();
  expect(target).toHaveFocus();
});

describe("keyboard stokes", () => {
  it("should trigger the click on spacebar", () => {
    target.focus();
    fireEvent.keyUp(target, { key: " " });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should trigger the click on enter", () => {
    target.focus();
    fireEvent.keyUp(target, { key: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  describe("Button is not focused", () => {
    it("should not trigger the click on spacebar", () => {
      fireEvent.keyUp(target, { key: " " });
      expect(target).not.toHaveFocus();
      expect(handleClick).toHaveBeenCalledTimes(0);
    });

    it("should not trigger the click on enter", () => {
      fireEvent.keyUp(target, { key: "Enter" });
      expect(target).not.toHaveFocus();
      expect(handleClick).toHaveBeenCalledTimes(0);
    });
  });
});
