import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { Markdown } from ".";

afterEach(cleanup);

it("renders Text Component", () => {
  const tree = renderer.create(<Markdown content="Paragraph" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="padded base"
    >
      <p
        className="base regular base greyBlueDark"
      >
        Paragraph
      </p>
    </div>
  `);
});

it("renders Italicized Component", () => {
  const tree = renderer
    .create(<Markdown content="_Italicized Foo_" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="padded base"
    >
      <p
        className="base regular base greyBlueDark"
      >
        <em
          className="base regular italic"
        >
          Italicized Foo
        </em>
      </p>
    </div>
  `);
});

it("renders Bold Component", () => {
  const tree = renderer.create(<Markdown content="**Bold Foo**" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="padded base"
    >
      <p
        className="base regular base greyBlueDark"
      >
        <b
          className="base bold"
        >
          Bold Foo
        </b>
      </p>
    </div>
  `);
});

it("renders Level 1 Heading Component", () => {
  const tree = renderer.create(<Markdown content="# Heading 1" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="padded base"
    >
      <h1
        className="base black jumbo uppercase blue"
      >
        Heading 1
      </h1>
    </div>
  `);
});

it("renders Level 2 Heading Component", () => {
  const tree = renderer.create(<Markdown content="## Heading 2" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="padded base"
    >
      <h2
        className="base black largest uppercase blue"
      >
        Heading 2
      </h2>
    </div>
  `);
});

it("renders Level 3 Heading Component", () => {
  const tree = renderer.create(<Markdown content="### Heading 3" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="padded base"
    >
      <h3
        className="base bold larger blue"
      >
        Heading 3
      </h3>
    </div>
  `);
});

it("renders Level 4 Heading Component", () => {
  const tree = renderer.create(<Markdown content="#### Heading 4" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="padded base"
    >
      <h4
        className="base bold large blue"
      >
        Heading 4
      </h4>
    </div>
  `);
});

it("renders Level 5 Heading Component", () => {
  const tree = renderer.create(<Markdown content="##### Heading 5" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="padded base"
    >
      <h5
        className="base bold base blue"
      >
        Heading 5
      </h5>
    </div>
  `);
});

it("renders Level 6 Heading Component", () => {
  const tree = renderer.create(<Markdown content="###### Heading " />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="padded base"
    >
      <h6>
        Heading
      </h6>
    </div>
  `);
});

it("renders a combination of Markdown components", () => {
  const tree = renderer
    .create(
      <Markdown
        text="# This is a paragraph.

        The paragaraph has some **bold text** and some _italicized text_.

        This is the end of this paragraph."
      />,
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="padded base"
    />
  `);
});
