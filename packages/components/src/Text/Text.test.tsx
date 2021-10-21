import React from "react";
import renderer from "react-test-renderer";
import { Text } from ".";

it("renders a paragraph", () => {
  const tree = renderer
    .create(
      <Text>
        Ask the information you need upfront from clients and new leads
      </Text>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular base left text"
    >
      Ask the information you need upfront from clients and new leads
    </p>
  `);
});

it("renders a subdued text", () => {
  const tree = renderer
    .create(<Text variation="subdued">Job note linked to related invoice</Text>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular base left textSecondary"
    >
      Job note linked to related invoice
    </p>
  `);
});

it("renders a success text", () => {
  const tree = renderer
    .create(<Text variation="success">Invoice sent</Text>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular base left success"
    >
      Invoice sent
    </p>
  `);
});

it("renders a error text", () => {
  const tree = renderer
    .create(<Text variation="error">Name is required</Text>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular base left critical"
    >
      Name is required
    </p>
  `);
});

it("renders a warning text", () => {
  const tree = renderer
    .create(<Text variation="warn">Your message is over 160 characters</Text>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular base left warning"
    >
      Your message is over 160 characters
    </p>
  `);
});

it("renders a info text", () => {
  const tree = renderer
    .create(
      <Text variation="info">
        Drag to rearrange the order that fields show up in Jobber
      </Text>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular base left informative"
    >
      Drag to rearrange the order that fields show up in Jobber
    </p>
  `);
});

it("renders a large text", () => {
  const tree = renderer
    .create(
      <Text size="large">
        Attract new customers by asking happy clients for a Facebook
        recommendation
      </Text>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular large left text"
    >
      Attract new customers by asking happy clients for a Facebook recommendation
    </p>
  `);
});

it("renders a small text", () => {
  const tree = renderer
    .create(<Text size="small">Teeny tiny text</Text>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular small left text"
    >
      Teeny tiny text
    </p>
  `);
});

it("renders a end-aligned text", () => {
  const tree = renderer
    .create(<Text align="right">right align me</Text>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular base right text"
    >
      right align me
    </p>
  `);
});

it("renders a center-aligned text", () => {
  const tree = renderer
    .create(<Text align="center">Center align me</Text>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular base center text"
    >
      Center align me
    </p>
  `);
});

it("renders a start-aligned text", () => {
  const tree = renderer
    .create(<Text align="left">left align me</Text>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular base left text"
    >
      left align me
    </p>
  `);
});
