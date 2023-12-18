import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InternalChip } from "../InternalChip";
import { Icon } from "../../Icon";

it("should render a div chip when onClick is not present", () => {
  render(<InternalChip label="Yo!" />);
  expect(screen.getByTestId("chip-wrapper")).toBeInstanceOf(HTMLDivElement);
});

it("should render a button chip when onClick is not present", () => {
  render(<InternalChip label="Yo!" onClick={jest.fn()} />);
  expect(screen.getByTestId("chip-wrapper")).toBeInstanceOf(HTMLButtonElement);
});

it("should fire the callback when it's clicked", async () => {
  const handleClick = jest.fn();
  render(<InternalChip label="Yo!" onClick={handleClick} />);
  await userEvent.click(screen.getByTestId("chip-wrapper"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

describe("Chip icon colors depending on state", () => {
  it("should be green when it's active", () => {
    expect(mockChip({ active: true })).toHaveStyle({
      fill: "var(--color-success)",
    });
  });

  interface MockChipProps {
    readonly invalid?: boolean;
    readonly disabled?: boolean;
    readonly active?: boolean;
  }

  function mockChip({
    invalid = false,
    disabled = false,
    active = false,
  }: MockChipProps) {
    const { getByTestId } = render(
      <InternalChip
        invalid={invalid}
        disabled={disabled}
        active={active}
        prefix={<Icon name="checkmark" />}
        label="Yo!"
      />,
    );

    return getByTestId("checkmark").querySelector("path");
  }
});
