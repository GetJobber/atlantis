import React from "react";
import renderer from "react-test-renderer";
import { Heading } from ".";

it("renders a Heading 1", () => {
  const tree = renderer
    .create(<Heading variation="page">Dis be a Heading 1</Heading>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h1
      className="base jumbo black uppercase"
    >
      Dis be a Heading 1
    </h1>
  `);
});

it("renders a Heading 2", () => {
  const tree = renderer
    .create(<Heading variation="subtitle">Dis be a Heading 2</Heading>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h2
      className="base largest black uppercase"
    >
      Dis be a Heading 2
    </h2>
  `);
});

it("renders a Heading 3", () => {
  const tree = renderer
    .create(<Heading variation="content">Dis be a Heading 3</Heading>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h3
      className="base larger bold"
    >
      Dis be a Heading 3
    </h3>
  `);
});

it("renders a Heading 4", () => {
  const tree = renderer
    .create(<Heading variation="section">Dis be a Heading 4</Heading>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h4
      className="base large bold"
    >
      Dis be a Heading 4
    </h4>
  `);
});

it("renders a Heading 5", () => {
  const tree = renderer
    .create(<Heading variation="subsection">Dis be a Heading 5</Heading>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h5
      className="base base bold"
    >
      Dis be a Heading 5
    </h5>
  `);
});

it("renders a Heading 6", () => {
  const tree = renderer
    .create(<Heading variation="overline">Dis be a Heading 6</Heading>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h6
      className="base small bold uppercase"
    >
      Dis be a Heading 6
    </h6>
  `);
});
