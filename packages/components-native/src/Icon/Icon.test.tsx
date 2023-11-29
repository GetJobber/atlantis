import React from "react";
import { render } from "@testing-library/react-native";
import { Icon } from ".";

it("renders home icon", () => {
  const tree = render(<Icon name="home" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders apple icon", () => {
  const tree = render(<Icon name="apple" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders large arrowDown icon", () => {
  const tree = render(<Icon name="arrowDown" size="large" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders thumbsDown icon", () => {
  const tree = render(<Icon name="thumbsDown" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders small more icon", () => {
  const tree = render(<Icon name="more" size="small" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders star icon with custom color", () => {
  const tree = render(<Icon name="star" customColor="#f33323" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders quote icon with themed color", () => {
  // The intention is to make sure the color prop can be applied to an icon with a built-in default color
  const tree = render(<Icon name="quote" color="brand" />).toJSON();
  expect(tree).toMatchSnapshot();
});
