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
