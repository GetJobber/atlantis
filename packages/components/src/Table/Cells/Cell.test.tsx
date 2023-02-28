import { render } from "@testing-library/react";
import React from "react";
import { Cell } from "./Cell";

it("renders a simple cell", () => {
  const { container } = render(<Cell>Ship</Cell>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <td
        class="cell left"
      >
        Ship
      </td>
    </div>
  `);
});

it("renders a left aligned cell", () => {
  const { container } = render(<Cell align="left">Ship</Cell>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <td
        class="cell left"
      >
        Ship
      </td>
    </div>
  `);
});

it("renders a right aligned cell", () => {
  const { container } = render(<Cell align="right">Ship</Cell>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <td
        class="cell right"
      >
        Ship
      </td>
    </div>
  `);
});

it("renders a center aligned cell", () => {
  const { container } = render(<Cell align="center">Ship</Cell>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <td
        class="cell center"
      >
        Ship
      </td>
    </div>
  `);
});
