import React from "react";
import { render, screen } from "@testing-library/react";
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

  describe("with stepped variation", () => {
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

describe("ProgressBar UNSAFE props", () => {
  describe("variation=progress", () => {
    it("applies UNSAFE_className.container to the progress element", () => {
      render(
        <ProgressBar
          currentStep={30}
          totalSteps={100}
          UNSAFE_className={{ container: "custom-progress" }}
        />,
      );

      const el = screen.getByRole("progressbar");
      expect(el).toHaveClass("custom-progress");
    });

    it("applies UNSAFE_style.container to the progress element", () => {
      render(
        <ProgressBar
          currentStep={30}
          totalSteps={100}
          UNSAFE_style={{ container: { backgroundColor: "papayawhip" } }}
        />,
      );

      const el = screen.getByRole("progressbar");
      expect(el).toHaveStyle({ backgroundColor: "papayawhip" });
    });
  });

  describe("variation=stepped", () => {
    it("applies UNSAFE_className.container and UNSAFE_style.container to the wrapper", () => {
      render(
        <ProgressBar
          currentStep={2}
          totalSteps={5}
          variation="stepped"
          UNSAFE_className={{ container: "custom-stepped" }}
          UNSAFE_style={{ container: { backgroundColor: "lavender" } }}
        />,
      );

      const el = screen.getByTestId("progressbar-wrapper");
      expect(el).toBeVisible();
      expect(el).toHaveClass("custom-stepped");
      expect(el).toHaveStyle({ backgroundColor: "lavender" });
    });
  });
});
