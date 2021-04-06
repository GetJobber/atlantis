import React from "react";
import renderer from "react-test-renderer";
import { Typography } from ".";

it("renders an H1 title", () => {
  const tree = renderer
    .create(
      <Typography
        element="h1"
        size="jumbo"
        textCase="uppercase"
        fontWeight="black"
      >
        Page title
      </Typography>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h1
      className="base black jumbo uppercase"
    >
      Page title
    </h1>
  `);
});

it("renders an H2 title", () => {
  const tree = renderer
    .create(
      <Typography
        element="h2"
        size="largest"
        textCase="uppercase"
        fontWeight="black"
      >
        Subtitle
      </Typography>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h2
      className="base black largest uppercase"
    >
      Subtitle
    </h2>
  `);
});

it("renders an H3 title", () => {
  const tree = renderer
    .create(
      <Typography element="h3" size="larger" fontWeight="bold">
        Content Group
      </Typography>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h3
      className="base bold larger"
    >
      Content Group
    </h3>
  `);
});

it("renders an H4 title", () => {
  const tree = renderer
    .create(
      <Typography element="h4" size="large" fontWeight="bold">
        Section
      </Typography>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h4
      className="base bold large"
    >
      Section
    </h4>
  `);
});

it("renders an H5 title", () => {
  const tree = renderer
    .create(
      <Typography element="h5" size="base" fontWeight="bold">
        Subsection
      </Typography>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h5
      className="base bold base"
    >
      Subsection
    </h5>
  `);
});

it("renders an H6 title", () => {
  const tree = renderer
    .create(
      <Typography
        element="h6"
        size="small"
        textCase="uppercase"
        fontWeight="bold"
      >
        Overline
      </Typography>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <h6
      className="base bold small uppercase"
    >
      Overline
    </h6>
  `);
});

it("renders a paragraph", () => {
  const tree = renderer
    .create(
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quae
        architecto accusamus cumque voluptate aspernatur repellendus natus, quo
        veniam illum.
      </Typography>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quae architecto accusamus cumque voluptate aspernatur repellendus natus, quo veniam illum.
    </p>
  `);
});

it("renders a span", () => {
  const tree = renderer
    .create(<Typography element="span">SHOUT!</Typography>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <span
      className="base regular"
    >
      SHOUT!
    </span>
  `);
});

it("renders an uppercased span", () => {
  const tree = renderer
    .create(<Typography textCase="uppercase">uppercase</Typography>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular uppercase"
    >
      uppercase
    </p>
  `);
});

it("renders a lowercased text", () => {
  const tree = renderer
    .create(<Typography textCase="lowercase">LOWERCASE</Typography>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular lowercase"
    >
      LOWERCASE
    </p>
  `);
});

it("renders a capitalized text", () => {
  const tree = renderer
    .create(
      <Typography textCase="capitalize">wElL tHiS iS hArD tO tYpE</Typography>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular capitalize"
    >
      wElL tHiS iS hArD tO tYpE
    </p>
  `);
});

it("should add textTruncate class when numberOfLines property is passed", () => {
  const tree = renderer
    .create(
      <Typography numberOfLines={3}>
        Pretend this is a multiline text
      </Typography>,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <p
      className="base regular textTruncate"
      style={
        Object {
          "WebkitLineClamp": 3,
        }
      }
    >
      Pretend this is a multiline text
    </p>
  `);
});
