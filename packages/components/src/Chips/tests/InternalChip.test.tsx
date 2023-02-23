import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InternalChip } from "../InternalChip";
import { Icon } from "../../Icon";

afterEach(cleanup);

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
  it("should be red when it's invalid", () => {
    expect(mockChip({ invalid: true })).toHaveStyle({
      fill: "var(--color-critical)",
    });
  });

  it("should be red when it's invalid and active", () => {
    expect(mockChip({ invalid: true, active: true })).toHaveStyle({
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

  it("should be white when it's active", () => {
    expect(mockChip({ active: true })).toHaveStyle({
      fill: "var(--color-white)",
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
    render(
      <InternalChip
        invalid={invalid}
        disabled={disabled}
        active={active}
        prefix={<Icon name="checkbox" />}
        label="Yo!"
      />,
    );
    return screen.getByTestId("checkbox").querySelector("path");
  }
});

// TODO: Figure out why this is always passing

describe.skip("When the chip is disabled and invalid", () => {
  it("should still look disabled but have a border of red", () => {
    render(<InternalChip disabled invalid label="Yo!" />);
    expect(screen.getByTestId("chip-wrapper")).toHaveStyle({
      borderColor: "var(--color-critical)",
      backgroundColor: "var(--color-disabled--secondary)",
    });
  });
});

describe.skip("When the chip is disabled and active", () => {
  it("should be a darker chip but still grey", async () => {
    render(<InternalChip disabled active label="Yo!" />);
    expect(screen.getByTestId("chip-wrapper")).toHaveStyle(`
        background-color: var(--color-disabled);
      `);
  });
});
