import { render, screen } from "@testing-library/react";
import React from "react";
import { StatusIndicator } from "./StatusIndicator";
import type { StatusIndicatorType } from "./StatusIndicator.type";

const statuses: StatusIndicatorType[] = [
  "success",
  "warning",
  "critical",
  "inactive",
  "informative",
];

it.each(statuses)(
  `renders a %s status indicator`,
  (status: StatusIndicatorType) => {
    render(<StatusIndicator status={status} />);

    expect(
      screen.getByTestId(`ATL-Status-Indicator-${status}`),
    ).toBeInTheDocument();
  },
);
