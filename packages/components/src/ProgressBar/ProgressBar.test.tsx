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

  describe("stepped variation", () => {
    it("renders correctly", () => {
      const { getAllByTestId } = render(
        <ProgressBar currentStep={2} totalSteps={3} variation={"stepped"} />,
      );

      const progressElements = getAllByTestId("progress-step");
      expect(progressElements).toHaveLength(3);

      const completeSteps = progressElements.filter(
        progress => progress.getAttribute("value") === "100",
      );
      expect(completeSteps).toHaveLength(2);

      const incompleteSteps = progressElements.filter(
        progress => progress.getAttribute("value") === "0",
      );
      expect(incompleteSteps).toHaveLength(1);
    });
  });
});
