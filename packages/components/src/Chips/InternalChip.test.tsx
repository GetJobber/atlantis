import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InternalChip } from "./InternalChip";
import { Icon } from "../Icon";

afterEach(cleanup);

it("should render a div chip when onClick is not present", () => {
  render(<InternalChip label="Yo!" />);
  expect(screen.getByTestId("chip-wrapper")).toBeInstanceOf(HTMLDivElement);
});

it("should render a button chip when onClick is not present", () => {
  render(<InternalChip label="Yo!" onClick={jest.fn()} />);
  expect(screen.getByTestId("chip-wrapper")).toBeInstanceOf(HTMLButtonElement);
});

it("should fire the callback when it's clicked", () => {
  const handleClick = jest.fn();
  render(<InternalChip label="Yo!" onClick={handleClick} />);
  userEvent.click(screen.getByTestId("chip-wrapper"));
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
