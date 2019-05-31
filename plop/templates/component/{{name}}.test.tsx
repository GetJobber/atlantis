import React from "react";
import renderer from "react-test-renderer";
import { {{name}} } from ".";

it("renders a {{name}}", () => {
  const tree = renderer.create(<{{name}} text="Foo" />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});

it("renders a loud {{name}}", () => {
  const tree = renderer.create(<{{name}} text="Foo" loud />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});
