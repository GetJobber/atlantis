import { render } from "@testing-library/react";
import React from "react";
import { ProgressBar } from "./ProgressBar";

describe("with props", () => {
  it("renders correctly", () => {
    const { container } = render(
      <ProgressBar currentStep={2} totalSteps={10} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("accepts small size", () => {
    const { container } = render(
      <ProgressBar currentStep={2} totalSteps={3} size={"small"} />,
    );
    expect(container).toMatchSnapshot();
  });
});
