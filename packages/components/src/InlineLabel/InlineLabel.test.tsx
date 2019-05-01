import React from "react";
import { InlineLabel } from ".";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<InlineLabel />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});
