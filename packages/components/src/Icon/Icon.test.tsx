import React from "react";
import renderer from "react-test-renderer";
import { Icon, IconName } from "./";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <>
        <Icon iconName={IconName.dashboard} />
        <Icon iconName={IconName.apple} />
      </>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
