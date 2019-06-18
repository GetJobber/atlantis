import React from "react";
import renderer from "react-test-renderer";
import { Heading } from ".";

it("renders a Heading", () => {
  const tree = renderer.create(<Heading text="Foo" />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});

it("renders a loud Heading", () => {
  const tree = renderer.create(<Heading text="Foo" loud />).toJSON();
  expect(tree).toMatchInlineSnapshot();
});
