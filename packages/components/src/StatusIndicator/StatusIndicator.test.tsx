import { render, screen } from "@testing-library/react";
import React from "react";
import { StatusIndicator, type StatusType } from "./StatusIndicator";

const statuses: StatusType[] = [
  "success",
  "warning",
  "critical",
  "inactive",
  "informative",
];

it.each(statuses)(`renders a %s status indicator`, (status: StatusType) => {
  render(<StatusIndicator status={status} />);

  expect(
    screen.getByTestId(`ATL-Status-Indicator-${status}`),
  ).toBeInTheDocument();
});
