import { render } from "@testing-library/react";
import React from "react";
import { CellCurrency } from "./CellCurrency";

it("renders a currency cell", () => {
  const { container } = render(<CellCurrency value={42000000} />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <td
        class="cell right"
      >
        <span
          class="numeric"
        >
          $42,000,000.00
        </span>
      </td>
    </div>
  `);
});

it("renders a currency cell in Pound Sterling", () => {
  const { container } = render(
    <CellCurrency value={32074770} currency="GBP" />,
  );
  expect(container).toMatchInlineSnapshot(`
    <div>
      <td
        class="cell right"
      >
        <span
          class="numeric"
        >
          £32,074,770.00
        </span>
      </td>
    </div>
  `);
});
