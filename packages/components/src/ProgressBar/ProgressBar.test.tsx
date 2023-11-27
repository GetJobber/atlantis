import { render, screen } from "@testing-library/react";
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
    beforeEach(() => {
      render(
        <ProgressBar currentStep={2} totalSteps={3} variation={"stepped"} />,
      );
    });
    it("renders the correct number of steps", () => {
      const progressElements = screen.getAllByTestId("progress-step");
      expect(progressElements).toHaveLength(3);
    });

    it("renders the correct number of completed steps", () => {
      const progressElements = screen.getAllByTestId("progress-step");
      const completedSteps = progressElements.filter(
        progress => progress.getAttribute("value") === "100",
      );
      expect(completedSteps).toHaveLength(2);
    });

    it("renders the correct number of incomplete steps", () => {
      const progressElements = screen.getAllByTestId("progress-step");
      const incompleteSteps = progressElements.filter(
        progress => progress.getAttribute("value") === "0",
      );
      expect(incompleteSteps).toHaveLength(1);
    });
  });
});
