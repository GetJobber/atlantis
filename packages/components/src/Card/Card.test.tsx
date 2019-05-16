import React from "react";
import renderer from "react-test-renderer";
import { Card, CardBanner, CardContent, CardDetail, CardHeader } from ".";

it("renders a card", () => {
  const tree = renderer
    .create(
      <Card accentColor="purple">
        <CardBanner>
          <h3>Invoice #1</h3>
        </CardBanner>

        <CardHeader>
          <h2>This is the exceptionally long card header.</h2>
          <p>This is the subtitle.</p>
        </CardHeader>

        <CardDetail>
          <h4>Details</h4>
        </CardDetail>

        <CardContent>
          <p>This is the card content.</p>
        </CardContent>
      </Card>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="card accent purple"
    >
      <header
        className="banner"
      >
        <h3>
          Invoice #1
        </h3>
      </header>
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
        className="detail"
      >
        <h4>
          Details
        </h4>
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
