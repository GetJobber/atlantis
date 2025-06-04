import React from "react";
import { render, screen } from "@testing-library/react";
import { SplitButton } from ".";

describe("SplitButton", () => {
  it("renders children in the correct order", () => {
    render(
      <SplitButton>
        <div data-testid="first-child">First</div>
        <div data-testid="second-child">Second</div>
      </SplitButton>,
    );

    const children = screen.getAllByTestId(/child/);
    expect(children).toHaveLength(2);
    expect(children[0]).toHaveTextContent("First");
    expect(children[1]).toHaveTextContent("Second");
  });

  it("applies the splitButton class to the wrapper", () => {
    render(
      <SplitButton>
        <div>Child content</div>
      </SplitButton>,
    );

    const wrapper = screen.getByText("Child content").parentElement;
    expect(wrapper).toHaveClass("splitButton");
  });
});
