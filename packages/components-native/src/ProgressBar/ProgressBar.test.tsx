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

describe("ProgressBar (native) - UNSAFE_style", () => {
  it("applies UNSAFE_style.container to the outer wrapper", () => {
    const containerStyle = { padding: 12, backgroundColor: "papayawhip" };
    render(
      <ProgressBar
        total={100}
        current={40}
        UNSAFE_style={{ container: containerStyle }}
      />,
    );

    const progressBar = screen.getByRole("progressbar");

    expect(progressBar.props.style).toEqual(
      expect.objectContaining(containerStyle),
    );
  });

  it("applies UNSAFE_style.progressBarContainer and track in progress variation", () => {
    const progressBarContainer = { height: 22, borderRadius: 10 };
    const track = { backgroundColor: "#eee" };

    render(
      <ProgressBar
        total={100}
        current={30}
        UNSAFE_style={{
          progressBarContainer,
          track,
        }}
      />,
    );

    const progressContainer = screen.getByTestId("progressbar-container");

    expect(progressContainer.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(progressBarContainer)]),
    );

    const trackView = screen.getByTestId("progressbar-track");
    expect(trackView.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(track)]),
    );
  });

  it("applies UNSAFE_style.inProgressFill and fill in progress variation", () => {
    const inProgressFill = { backgroundColor: "#f59e0b" };
    const fill = { backgroundColor: "#10b981" };

    render(
      <ProgressBar
        total={100}
        current={30}
        inProgress={10}
        UNSAFE_style={{
          inProgressFill,
          fill,
        }}
      />,
    );

    const inProgressView = screen.getByTestId("progressbar-inprogress");
    const fillView = screen.getByTestId("progressbar-fill");

    expect(inProgressView.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(inProgressFill)]),
    );
    expect(fillView.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(fill)]),
    );
  });

  it("applies UNSAFE_style.progressBarContainer and step in stepped variation", () => {
    const progressBarContainer = { height: 12 };
    const step = { backgroundColor: "#d1d5db" };

    render(
      <ProgressBar
        variation="stepped"
        total={4}
        current={2}
        inProgress={1}
        UNSAFE_style={{ progressBarContainer, step }}
      />,
    );

    const steppedContainer = screen.getByTestId("progressbar-container");

    expect(steppedContainer.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(progressBarContainer)]),
    );

    // Steps are rendered with testIDs depending on state; collect all steps by known IDs
    const stepNodes = [
      ...screen.getAllByTestId("progress-step-completed"),
      ...screen.getAllByTestId("progress-step-in-progress"),
      ...screen.getAllByTestId("progress-step-incomplete"),
    ];

    // At least one step should exist and contain the custom style
    expect(stepNodes.length).toBeGreaterThan(0);
    stepNodes.forEach(node => {
      expect(node.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining(step)]),
      );
    });
  });
});
