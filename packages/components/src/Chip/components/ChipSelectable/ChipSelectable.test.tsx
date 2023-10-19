import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { ChipSelectable } from "./ChipSelectable";

describe("Chip Selectable", () => {
  it("renders without error", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <ChipSelectable label="Label" onClick={onClick} />,
    );

    expect(getByText("Label")).toBeInTheDocument();
  });

  it("renders with cross", () => {
    const onClick = jest.fn();
    const { container } = render(
      <ChipSelectable label="Label" onClick={onClick} />,
    );

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <ChipSelectable onClick={onClick} label="Test Chip" />,
    );

    fireEvent.click(getByText("Test Chip"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
