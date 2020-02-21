import React from "react";
import renderer from "react-test-renderer";
import { Icon } from ".";

it("renders dashboard icon", () => {
  const tree = renderer.create(<Icon name="dashboard" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders apple icon", () => {
  const tree = renderer.create(<Icon name="apple" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders large arrowDown icon", () => {
  const tree = renderer.create(<Icon name="arrowDown" size="large" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders thumbsDown icon", () => {
  const tree = renderer.create(<Icon name="thumbsDown" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders small more icon", () => {
  const tree = renderer.create(<Icon name="more" size="small" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders truck icon", () => {
  const tree = renderer.create(<Icon name="truck" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders star icon with custom color", () => {
  const tree = renderer
    .create(<Icon name="star" customColor="#f33323" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
