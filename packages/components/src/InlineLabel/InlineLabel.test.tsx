import React from "react";
import renderer from "react-test-renderer";
import { InlineLabel } from ".";

it("renders correctly", () => {
  const tree = renderer.create(<InlineLabel>My Label</InlineLabel>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <span
      className="inlineLabel base greyBlue"
    >
      <span
        className="base regular smaller"
      >
        My Label
      </span>
    </span>
  `);
});
