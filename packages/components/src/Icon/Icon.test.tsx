import React from "react";
import renderer from "react-test-renderer";
import { Icon, IconName } from ".";

it("renders dashboard icon", () => {
  const tree = renderer.create(<Icon iconName={IconName.dashboard} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders apple icon", () => {
  const tree = renderer.create(<Icon iconName={IconName.apple} />).toJSON();
  expect(tree).toMatchSnapshot();
});
