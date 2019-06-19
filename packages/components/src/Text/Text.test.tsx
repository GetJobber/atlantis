import React from "react";
import renderer from "react-test-renderer";
import { Text } from ".";

it("renders a Text", () => {
  const tree = renderer.create(<Text text="Foo" />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});

it("renders a loud Text", () => {
  const tree = renderer.create(<Text text="Foo" loud />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});
