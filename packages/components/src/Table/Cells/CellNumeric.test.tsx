import { render } from "@testing-library/react";
import React from "react";
import { CellNumeric } from "./CellNumeric";

it("renders a numeric cell", () => {
  const { container } = render(<CellNumeric value={13} />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <td
        class="cell right"
      >
        <span
          class="numeric"
        >
          13
        </span>
      </td>
    </div>
  `);
});
