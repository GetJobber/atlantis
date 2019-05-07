import React from "react";
import renderer from "react-test-renderer";
import { CellNumeric } from "./CellNumeric";

it("renders a numeric cell", () => {
  const tree = renderer.create(<CellNumeric value={13} />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <td
      className="cell right"
    >
      <span
        className="numeric"
      >
        13
      </span>
    </td>
  `);
});
