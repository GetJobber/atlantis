import React from "react";
import { InlineLabel } from "./InlineLabel";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<InlineLabel>My Label</InlineLabel>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <span
      className="inlineLabel normal greyBlue"
    >
      My Label
    </span>
  `);
});
