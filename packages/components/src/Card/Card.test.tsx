import React from "react";
import renderer from "react-test-renderer";
import { Card, CardContent, CardTitle } from ".";

it("renders a simple card", () => {
  const tree = renderer
    .create(
      <Card simple accent="purple">
        <p>This is the card content.</p>
      </Card>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
            <div
              className="card accent purple"
            >
              <div
                className="content"
              >
                <p>
                  This is the card content.
                </p>
              </div>
            </div>
      `);
});

it("renders a card", () => {
  const tree = renderer
    .create(
      <Card accent="green">
        <CardTitle title="The Undiscovered Country" />

        <CardContent>
          <p>This is the card content.</p>
        </CardContent>
      </Card>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="card accent green"
    >
      <div
        className="header"
      >
        <span
          className="cardTitle"
        >
          The Undiscovered Country
        </span>
      </div>
      <div
        className="content"
      >
        <p>
          This is the card content.
        </p>
      </div>
    </div>
  `);
});
