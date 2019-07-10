import React from "react";
import renderer from "react-test-renderer";
import { Icon } from ".";

it("renders dashboard icon", () => {
  const tree = renderer.create(<Icon iconName="dashboard" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders apple icon", () => {
  const tree = renderer.create(<Icon iconName="apple" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders large arrowDown icon", () => {
  const tree = renderer
    .create(<Icon iconName="arrowDown" size="large" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders small more icon", () => {
  const tree = renderer.create(<Icon iconName="more" size="small" />).toJSON();
  expect(tree).toMatchSnapshot();
});
