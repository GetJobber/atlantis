import React from "react";
import renderer from "react-test-renderer";
import { StatusLabel } from "./StatusLabel";

it("renders correctly", () => {
  const tree = renderer.create(<StatusLabel status="pending" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <span
      className="statusWrapper"
    >
      <span
        className="inlineLabel normal yellow"
      >
        pending
      </span>
    </span>
  `);
});
