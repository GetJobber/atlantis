import React from "react";
import { render } from "@testing-library/react-native";
import { ProgressAppointmentTitle } from "atlantis/ProgressBar/ProgressAppointmentTitle";
import { ProgressBar, ProgressBarProps } from ".";

const defaultSetupProps = {
  total: 0,
  current: 0,
  inProgress: 0,
  loading: false,
  amountFormatted: "$0",
  totalAmountFormatted: "$0",
};
interface HeaderProps {
  amountFormatted?: string;
  totalAmountFormatted?: string;
}

type ProgressBarCombinedProps = ProgressBarProps & HeaderProps;

function renderProgressBarComponent({
  total,
  current,
  inProgress,
  amountFormatted,
  totalAmountFormatted,
}: ProgressBarCombinedProps) {
  return render(
    <ProgressBar
      total={total}
      current={current}
      inProgress={inProgress}
      header={
        <ProgressAppointmentTitle
          total={total}
          current={current}
          amountFormatted={amountFormatted}
          totalAmountFormatted={totalAmountFormatted}
          reverseTheme={true}
        />
      }
    />,
  );
}

it("renders 0 visits completed title when no visits are completed", () => {
  const bar = renderProgressBarComponent(defaultSetupProps);
  expect(bar.getByText(`0 visits completed`)).toBeDefined();
});

/* TODO: this test is tricky because there is no text to check against.
For full implementation we should we if we can test against the width in style.
We would have to test the CompletedProgressBar seperatley.
*/
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
  expect(bar.getByText("1 visit completed")).toBeDefined();
});

it("renders green CompletedProgress bar and renders 'visits' as the smart string in the progress bar title", () => {
  const current = 2;
  const bar = renderProgressBarComponent({
    ...defaultSetupProps,
    current: current,
    total: 3,
  });
  expect(bar).toMatchSnapshot();
  expect(bar.getByText("2 visits completed")).toBeDefined();
});

it("renders finished label when all visits are completed", () => {
  const bar = renderProgressBarComponent({
    ...defaultSetupProps,
    current: 2,
    total: 2,
  });
  expect(bar.getByText(`All visits completed`)).toBeDefined();
});
