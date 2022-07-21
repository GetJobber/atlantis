import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InternalChipButton } from "../InternalChipButton";

describe("Interaction", () => {
  let handleClick: jest.Mock;
  let target: HTMLElement;

  beforeEach(() => {
    handleClick = jest.fn();
    render(
      <InternalChipButton icon="home" onClick={handleClick} label="Yo!" />,
    );
    target = screen.getByTestId("remove-chip-button");
  });

  afterEach(cleanup);

  it("should call the onClick action", () => {
    userEvent.click(target);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be focusable", () => {
    target.focus();
    expect(target).toHaveFocus();
  });

  describe("keyboard stokes", () => {
    it("should trigger the click on spacebar", () => {
      target.focus();
      fireEvent.keyUp(target, { key: "a" });
      expect(handleClick).toHaveBeenCalledTimes(0);
      fireEvent.keyUp(target, { key: " " });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should trigger the click on enter", () => {
      target.focus();
      fireEvent.keyUp(target, { key: "Tab" });
      expect(handleClick).toHaveBeenCalledTimes(0);
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
});

describe("Chip icon colors depending on state", () => {
  it("should be red when it's invalid", () => {
    expect(mockChip({ invalid: true })).toHaveStyle({
      fill: "var(--color-critical)",
    });
  });

  it("should be grey when it's disabled", () => {
    expect(mockChip({ disabled: true })).toHaveStyle({
      fill: "var(--color-disabled)",
    });
  });

  it("should be grey when it's disabled and invalid", () => {
    expect(mockChip({ disabled: true, invalid: true })).toHaveStyle({
      fill: "var(--color-disabled)",
    });
  });

  interface MockChipProps {
    readonly invalid?: boolean;
    readonly disabled?: boolean;
  }

  function mockChip({ invalid = false, disabled = false }: MockChipProps) {
    render(
      <InternalChipButton
        invalid={invalid}
        disabled={disabled}
        label="Yo!"
        icon={"checkmark"}
        onClick={jest.fn()}
      />,
    );

    return screen.getByTestId("remove-chip-button").querySelector("path");
  }
});
