import React from "react";
import renderer from "react-test-renderer";
import { CellCurrency } from "./CellCurrency";

it("renders a currency cell", () => {
  const tree = renderer.create(<CellCurrency value={42000000} />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <td
      className="cell right"
    >
      <span
        className="numeric"
      >
        $42,000,000.00
      </span>
    </td>
  `);
});

it("renders a currency cell in Pound Sterling", () => {
  const tree = renderer
    .create(<CellCurrency value={32074770} currency="GBP" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
        <td
          className="cell right"
        >
          <span
            className="numeric"
          >
            £32,074,770.00
          </span>
        </td>
    `);
});
