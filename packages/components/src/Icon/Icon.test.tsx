import { iconClassMap, sizesClassMap } from "@jobber/design";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Icon } from ".";

function getReversedMap(
  classes: Record<string, string>,
): Record<string, string> {
  return Object.entries<string>(classes).reduce(
    (acc, [key, value]) => ({ ...acc, [value]: key }),
    {},
  );
}

const iconClasses = getReversedMap(iconClassMap);
const sizeClasses = getReversedMap(sizesClassMap);

it("renders an icon", () => {
  render(<Icon name="dashboard" />);

  const icon = screen.getByTestId("dashboard");
  expect(icon).toBeInstanceOf(SVGElement);
  expect(icon).toHaveClass(iconClasses.icon);
  expect(icon).toHaveClass(sizeClasses.base);

  const parentElement = icon.parentElement;
  expect(parentElement).toBeInstanceOf(HTMLSpanElement);
  expect(parentElement).toHaveClass(iconClasses.icon);
  expect(parentElement).toHaveClass(sizeClasses.base);
});

it("renders large arrowDown icon", () => {
  render(<Icon name="arrowDown" size="large" />);

  const icon = screen.getByTestId("arrowDown");
  expect(icon).toHaveClass(sizeClasses.large);
  expect(icon.parentElement).toHaveClass(sizeClasses.large);
});

it("renders small more icon", () => {
  render(<Icon name="more" size="small" />);

  const icon = screen.getByTestId("more");
  expect(icon).toHaveClass(sizeClasses.small);
  expect(icon.parentElement).toHaveClass(sizeClasses.small);
});

it("renders truck icon", () => {
  const { container } = render(<Icon name="truck" />);
  expect(container).toMatchSnapshot();
});

it("renders star icon with custom color", () => {
  render(<Icon name="star" customColor="#f33323" />);
  const icon = screen.getByTestId("star");
  expect(icon.firstElementChild).toHaveAttribute("fill", "#f33323");
});
