import { render } from "@testing-library/react";
import React from "react";
import { Icon } from ".";

it("renders dashboard icon", () => {
  const { container } = render(<Icon name="dashboard" />);
  expect(container).toMatchSnapshot();
});

it("renders apple icon", () => {
  const { container } = render(<Icon name="apple" />);
  expect(container).toMatchSnapshot();
});

it("renders large arrowDown icon", () => {
  const { container } = render(<Icon name="arrowDown" size="large" />);
  expect(container).toMatchSnapshot();
});

it("renders thumbsDown icon", () => {
  const { container } = render(<Icon name="thumbsDown" />);
  expect(container).toMatchSnapshot();
});

it("renders small more icon", () => {
  const { container } = render(<Icon name="more" size="small" />);
  expect(container).toMatchSnapshot();
});

it("renders truck icon", () => {
  const { container } = render(<Icon name="truck" />);
  expect(container).toMatchSnapshot();
});

it("renders star icon with custom color", () => {
  const { container } = render(<Icon name="star" customColor="#f33323" />);
  expect(container).toMatchSnapshot();
});

it("applies testID prop to svg element", () => {
  const { getByTestId } = render(<Icon name="star" testID="star-icon" />);
  expect(getByTestId("star-icon")).toBeInTheDocument();
});

it("applies name prop as testID when testID prop is not provided", () => {
  const { getByTestId } = render(<Icon name="star" />);
  expect(getByTestId("star")).toBeInTheDocument();
});
