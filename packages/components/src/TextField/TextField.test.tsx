import React from "react";
import TextField from "./TextField";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<TextField />).toJSON();
  expect(tree).toMatchSnapshot();
});
