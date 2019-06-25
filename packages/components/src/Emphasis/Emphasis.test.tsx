import React from "react";
import renderer from "react-test-renderer";
import { Emphasis } from ".";

it("renders a bold text", () => {
  const tree = renderer
    .create(<Emphasis variation="bold">Save $240</Emphasis>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <b
      className="base bold"
    >
      Save $240
    </b>
  `);
});

it("renders an italic text", () => {
  const tree = renderer
    .create(
      <Emphasis variation="italic">
        Job note linked to related invoice
      </Emphasis>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <em
      className="base italic"
    >
      Job note linked to related invoice
    </em>
  `);
});

it("renders a highlighted text", () => {
  const tree = renderer
    .create(<Emphasis variation="highlight">Highlight me up</Emphasis>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <strong
      className="base highlight"
    >
      Highlight me up
    </strong>
  `);
});
