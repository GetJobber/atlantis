import React from "react";
import { render, screen } from "@testing-library/react-native";
import { ProgressBar, ProgressBarProps } from ".";
import { styles } from "./ProgressBar.style";

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
        total={3}
        current={2}
        inProgress={1}
        variation={"stepped"}
      />,
    );
  });
  it("renders the correct number of steps", () => {
    const stepElements = screen.getAllByTestId("progress-step");
    expect(stepElements).toHaveLength(3);
  });
  it("renders the correct number of completed steps", () => {
    const stepElements = screen.getAllByTestId("progress-step");
    const completedSteps = stepElements.filter(step =>
      step.props.style.includes(styles.completedStep),
    );
    expect(completedSteps).toHaveLength(2);
  });
  it("renders the correct number of incomplete steps", () => {
    const stepElements = screen.getAllByTestId("progress-step");
    const incompleteSteps = stepElements.filter(
      step => !step.props.style.includes(styles.completedStep),
    );
    expect(incompleteSteps).toHaveLength(1);
  });
  it("renders the correct number of inProgress steps", () => {
    const stepElements = screen.getAllByTestId("progress-step");
    const inProgressSteps = stepElements.filter(step =>
      step.props.style.includes(styles.inProgressStep),
    );
    expect(inProgressSteps).toHaveLength(1);
  });
});
