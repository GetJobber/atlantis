import React from "react";
import renderer from "react-test-renderer";
import { Heading } from ".";

it("renders a Heading 1", () => {
  const tree = renderer
    .create(<Heading level={1}>Dis be a Heading 1</Heading>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h1
      className="base black jumbo heading"
    >
      Dis be a Heading 1
    </h1>
  `);
});

it("renders a Heading 2", () => {
  const tree = renderer
    .create(<Heading level={2}>Dis be a Heading 2</Heading>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h2
      className="base black largest heading"
    >
      Dis be a Heading 2
    </h2>
  `);
});

it("renders a Heading 3", () => {
  const tree = renderer
    .create(<Heading level={3}>Dis be a Heading 3</Heading>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h3
      className="base bold larger heading"
    >
      Dis be a Heading 3
    </h3>
  `);
});

it("renders a Heading 4", () => {
  const tree = renderer
    .create(<Heading level={4}>Dis be a Heading 4</Heading>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h4
      className="base bold large heading"
    >
      Dis be a Heading 4
    </h4>
  `);
});

it("renders a Heading 5", () => {
  const tree = renderer
    .create(<Heading level={5}>Dis be a Heading 5</Heading>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h5
      className="base bold base heading"
    >
      Dis be a Heading 5
    </h5>
  `);
});
