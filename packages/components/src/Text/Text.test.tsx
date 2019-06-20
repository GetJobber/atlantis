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
      className="base base regular"
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
      className="base base regular greyBlue"
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
      className="base base regular green"
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
      className="base base regular red"
    >
      Name is required
    </p>
  `);
});

it("renders a warning text", () => {
  const tree = renderer
    .create(
      <Text variation="warning">Your message is over 160 characters</Text>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base base regular yellow"
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
      className="base base regular blue"
    >
      Drag to rearrange the order that fields show up in Jobber
    </p>
  `);
});

it("renders a button text", () => {
  const tree = renderer
    .create(<Text variation="button">Update Quote</Text>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base small extraBold uppercase green"
    >
      Update Quote
    </p>
  `);
});

it("renders a subhead text", () => {
  const tree = renderer
    .create(
      <Text variation="subhead">
        Attract new customers by asking happy clients for a Facebook
        recommendation
      </Text>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base larger regular"
    >
      Attract new customers by asking happy clients for a Facebook recommendation
    </p>
  `);
});
