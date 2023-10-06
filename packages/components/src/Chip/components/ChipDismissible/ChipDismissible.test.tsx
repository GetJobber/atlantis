import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ChipDismissible } from "./ChipDismissible";

describe("Chip Dismissible", () => {
  it("renders without error", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <ChipDismissible label="Label" onClick={onClick} />,
    );

    expect(getByText("Label")).toBeInTheDocument();
  });

  it("renders with cross", () => {
    const onClick = jest.fn();
    const { container } = render(
      <ChipDismissible label="Label" onClick={onClick} />,
    );

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <ChipDismissible onClick={onClick} label="Test Chip" />,
    );

    fireEvent.click(getByText("Test Chip"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
