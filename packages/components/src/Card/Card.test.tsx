import React from "react";
import renderer from "react-test-renderer";
import { Card, CardTitle } from ".";

it("renders a simple card", () => {
  const tree = renderer
    .create(
      <Card accent="purple">
        <p>This is the card content.</p>
      </Card>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="card accent purple"
    >
      <p>
        This is the card content.
      </p>
    </div>
  `);
});

it("renders a card", () => {
  const tree = renderer
    .create(
      <Card accent="green">
        <CardTitle title="The Undiscovered Country" />

        <p>This is the card content.</p>
      </Card>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="card accent green"
    >
      <div
        className="header fill"
      >
        <span
          className="cardTitle"
        >
          The Undiscovered Country
        </span>
      </div>
      <p>
        This is the card content.
      </p>
    </div>
  `);
});
