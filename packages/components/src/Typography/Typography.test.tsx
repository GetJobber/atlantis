import React from "react";
import renderer from "react-test-renderer";
import { Typography } from ".";

it("renders a Typography", () => {
  const tree = renderer.create(<Typography text="Foo" />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});

it("renders a loud Typography", () => {
  const tree = renderer.create(<Typography text="Foo" loud />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});
