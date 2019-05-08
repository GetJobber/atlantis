import React from "react";
import renderer from "react-test-renderer";
import { Cell } from "./Cell";

it("renders a simple cell", () => {
  const tree = renderer.create(<Cell>Ship</Cell>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <td
      className="cell left"
    >
      Ship
    </td>
  `);
});

it("renders a left aligned cell", () => {
  const tree = renderer.create(<Cell align="left">Ship</Cell>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <td
      className="cell left"
    >
      Ship
    </td>
  `);
});

it("renders a right aligned cell", () => {
  const tree = renderer.create(<Cell align="right">Ship</Cell>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <td
      className="cell right"
    >
      Ship
    </td>
  `);
});

it("renders a center aligned cell", () => {
  const tree = renderer.create(<Cell align="center">Ship</Cell>).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <td
      className="cell center"
    >
      Ship
    </td>
  `);
});
