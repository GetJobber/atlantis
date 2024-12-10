import { render, screen } from "@testing-library/react";
import React from "react";
import { InputValidation } from ".";

describe("InputValidation", () => {
  it("renders the input validation messages", () => {
    render(<InputValidation message="I am an error" />);
    expect(screen.getByText("I am an error")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("does not render the input validation messages when visible is false", () => {
    render(<InputValidation message="I am an error" visible={false} />);
    expect(screen.queryByText("I am an error")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
