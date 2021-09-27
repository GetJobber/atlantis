import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InternalChip } from "../InternalChip";
import { ChipIcon } from "..";

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
  function mockChip(type: "invalid" | "disabled" | "active") {
    render(
      <InternalChip
        invalid={type === "invalid"}
        disabled={type === "disabled"}
        active={type === "active"}
        prefix={<ChipIcon name="checkbox" />}
        label="Yo!"
      />,
    );
    return screen.getByTestId("checkbox").querySelector("path");
  }

  it("should be red when it's invalid", () => {
    expect(mockChip("invalid")).toHaveStyle({
      fill: "var(--color-critical--onSurface)",
    });
  });

  it("should be grey when it's disabled", () => {
    expect(mockChip("disabled")).toHaveStyle({
      fill: "var(--color-disabled)",
    });
  });

  it("should be white when it's active", () => {
    expect(mockChip("active")).toHaveStyle({ fill: "var(--color-white)" });
  });
});

describe("When the chip is disabled and invalid", () => {
  it("should still look disabled but have a border of red", () => {
    render(<InternalChip disabled invalid label="Yo!" />);
    expect(screen.getByTestId("chip-wrapper")).toHaveStyle({
      borderColor: "var(--color-critical)",
      backgroundColor: "var(--color-disabled--secondary)",
    });
  });
});
