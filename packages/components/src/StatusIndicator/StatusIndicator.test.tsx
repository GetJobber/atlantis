import { render } from "@testing-library/react";
import React from "react";
import { StatusIndicator } from "./StatusIndicator";

it("renders a success status indicator", () => {
  const { container } = render(<StatusIndicator status="success" />);
  expect(container).toMatchSnapshot();
});

it("renders a warning status indicator", () => {
  const { container } = render(<StatusIndicator status="warning" />);
  expect(container).toMatchSnapshot();
});

it("renders a informative status indicator", () => {
  const { container } = render(<StatusIndicator status="informative" />);
  expect(container).toMatchSnapshot();
});

it("renders a critical status indicator", () => {
  const { container } = render(<StatusIndicator status="critical" />);
  expect(container).toMatchSnapshot();
});

it("renders an inactive status indicator", () => {
  const { container } = render(<StatusIndicator status="inactive" />);
  expect(container).toMatchSnapshot();
});
