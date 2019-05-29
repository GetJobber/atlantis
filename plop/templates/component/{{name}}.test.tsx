import React from "react";
import renderer from "react-test-renderer";
import { {{name}} } from ".";

it("renders a {{name}}", () => {
  const tree = renderer.create(<{{name}} text="Foo" />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});

it("renders an important {{name}}", () => {
  const tree = renderer.create(<{{name}} text="Foo" important />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});
