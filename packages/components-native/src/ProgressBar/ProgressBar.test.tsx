import React from "react";
import { render } from "@testing-library/react-native";
import { ProgressBar, ProgressBarProps } from ".";

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

it("renders green CompletedProgress bar and renders 'visit' as the smart string in the progress bar title", () => {
  const current = 1;
  const bar = renderProgressBarComponent({
    ...defaultSetupProps,
    current: current,
    total: 2,
  });
  expect(bar).toMatchSnapshot();
});

it("renders green CompletedProgress bar and renders 'visits' as the smart string in the progress bar title", () => {
  const current = 2;
  const bar = renderProgressBarComponent({
    ...defaultSetupProps,
    current: current,
    total: 3,
  });
  expect(bar).toMatchSnapshot();
});
