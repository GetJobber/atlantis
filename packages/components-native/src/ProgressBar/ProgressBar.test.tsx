import React from "react";
import { render, screen } from "@testing-library/react-native";
import type { ProgressBarProps } from ".";
import { ProgressBar } from ".";

const defaultSetupProps = {
  total: 0,
  current: 0,
  inProgress: 0,
  loading: false,
};

type ProgressBarCombinedProps = ProgressBarProps;

function renderProgressBarComponent({
  total,
  current,
  inProgress,
}: ProgressBarCombinedProps) {
  return render(
    <ProgressBar total={total} current={current} inProgress={inProgress} />,
  );
}

it("renders blue inProgress bar when 1 or more jobs is in progress", () => {
  const bar = renderProgressBarComponent({
    ...defaultSetupProps,
    inProgress: 1,
  }).toJSON();
  expect(bar).toMatchSnapshot();
});

it("renders green CompletedProgress bar when 1 or more jobs is completed", () => {
  const current = 1;
  const bar = renderProgressBarComponent({
    ...defaultSetupProps,
    current: current,
    total: 2,
  });
  expect(bar).toMatchSnapshot();
  expect(bar.getByLabelText("1 of 2 complete")).toBeDefined();
});

describe("with stepped variation", () => {
  beforeEach(() => {
    render(
      <ProgressBar
        total={4}
        current={2}
        inProgress={1}
        variation={"stepped"}
      />,
    );
  });
  it("renders the correct number of completed steps", () => {
    const completedSteps = screen.getAllByTestId("progress-step-completed");
    expect(completedSteps).toHaveLength(2);
  });
  it("renders the correct number of incomplete steps", () => {
    const inCompleteSteps = screen.getAllByTestId("progress-step-incomplete");
    expect(inCompleteSteps).toHaveLength(1);
  });
  it("renders the correct number of inProgress steps", () => {
    const stepElements = screen.getAllByTestId("progress-step-in-progress");
    expect(stepElements).toHaveLength(1);
  });
});
