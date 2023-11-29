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
