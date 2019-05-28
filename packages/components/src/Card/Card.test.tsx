import React from "react";
import renderer from "react-test-renderer";
import { Card, CardContent, CardHeader } from ".";

it("renders a simple card", () => {
  const tree = renderer
    .create(
      <Card simple accentColor="purple">
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
      <Card accentColor="green">
        <CardHeader>
          <h2>This is the exceptionally long card header.</h2>
          <p>This is the subtitle.</p>
        </CardHeader>

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
        <h2>
          This is the exceptionally long card header.
        </h2>
        <p>
          This is the subtitle.
        </p>
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
