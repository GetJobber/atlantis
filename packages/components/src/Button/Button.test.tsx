import React from "react";
import renderer from "react-test-renderer";
import { Button } from ".";

it("renders a Button", () => {
  const tree = renderer.create(<Button text="Foo" />).toJSON();
  // expect(tree).toMatchInlineSnapshot();
});

it("renders a loud Button", () => {
  const tree = renderer.create(<Button text="Foo" loud />).toJSON();
  // expect(tree).toMatchInlineSnapshot();
});
