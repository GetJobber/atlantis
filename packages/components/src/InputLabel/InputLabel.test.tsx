import React from "react";
import { render, screen } from "@testing-library/react";
import { InputLabel } from "./InputLabel";

describe("InputLabel component", () => {
  it("should render the label with the provided text", () => {
    render(<InputLabel label="Test Label" inputId="test-id" />);

    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe("LABEL");
    expect(labelElement).toHaveAttribute("for", "test-id");
  });

  it("should not render anything when the label is not provided", () => {
    const { container } = render(<InputLabel inputId="test-id" />);

    expect(container.firstChild).toBeNull();
  });

  it("should apply the provided style to the label", () => {
    const customStyle = { color: "red", fontWeight: "bold" };

    render(
      <InputLabel
        label="Styled Label"
        inputId="styled-id"
        style={customStyle}
      />,
    );

    const labelElement = screen.getByText("Styled Label");
    expect(labelElement).toHaveStyle({ color: "red", fontWeight: "bold" });
  });

  it("should render with a default inputId when none is provided", () => {
    render(<InputLabel label="No ID Label" />);

    const labelElement = screen.getByText("No ID Label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).not.toHaveAttribute("for");
  });
});
