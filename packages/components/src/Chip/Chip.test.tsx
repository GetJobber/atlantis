import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Chip } from "./Chip";

const onClick = jest.fn();

describe("Chip", () => {
  it("renders without error", () => {
    const { getByText } = render(<Chip label="Label" onClick={onClick} />);

    expect(getByText("Label")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const { getByText } = render(<Chip onClick={onClick} label="Test Chip" />);

    fireEvent.click(getByText("Test Chip"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
