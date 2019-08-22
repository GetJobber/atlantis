import React from "react";
import renderer from "react-test-renderer";
import { cleanup } from "@testing-library/react";
import { Markdown } from ".";

afterEach(cleanup);

it("renders Text Component", () => {
  const tree = renderer.create(<Markdown text="Paragraph" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
                                <p
                                  className="base base greyBlueDark"
                                >
                                  Paragraph
                                </p>
                `);
});

it("renders Italicized Component", () => {
  const tree = renderer.create(<Markdown text="_Italicized Foo_" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
                            <p
                              className="base base greyBlueDark"
                            >
                              <em
                                className="base italic"
                              >
                                Italicized Foo
                              </em>
                            </p>
              `);
});

it("renders Bold Component", () => {
  const tree = renderer.create(<Markdown text="**Bold Foo**" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
                            <p
                              className="base base greyBlueDark"
                            >
                              <b
                                className="base bold"
                              >
                                Bold Foo
                              </b>
                            </p>
              `);
});

it("renders Level 1 Heading Component", () => {
  const tree = renderer.create(<Markdown text="# Heading 1" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
                            <h1
                              className="base jumbo black uppercase"
                            >
                              Heading 1
                            </h1>
              `);
});

it("renders Level 2 Heading Component", () => {
  const tree = renderer.create(<Markdown text="## Heading 2" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
                            <h2
                              className="base largest black uppercase"
                            >
                              Heading 2
                            </h2>
              `);
});

it("renders Level 3 Heading Component", () => {
  const tree = renderer.create(<Markdown text="### Heading 3" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
                            <h3
                              className="base larger bold"
                            >
                              Heading 3
                            </h3>
              `);
});

it("renders Level 4 Heading Component", () => {
  const tree = renderer.create(<Markdown text="#### Heading 4" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
                            <h4
                              className="base large bold"
                            >
                              Heading 4
                            </h4>
              `);
});

it("renders Level 5 Heading Component", () => {
  const tree = renderer.create(<Markdown text="##### Heading 5" />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
                            <h5
                              className="base base bold"
                            >
                              Heading 5
                            </h5>
              `);
});

it("renders Level 6 Heading Component", () => {
  const tree = renderer.create(<Markdown text="###### Heading " />).toJSON();
  expect(tree).toMatchInlineSnapshot(`
                            <h6>
                              Heading
                            </h6>
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
    <h1
      className="base jumbo black uppercase"
    >
      This is a paragraph. The paragaraph has some 
      <b
        className="base bold"
      >
        bold text
      </b>
       and some 
      <em
        className="base italic"
      >
        italicized text
      </em>
      . This is the end of this paragraph.
    </h1>
  `);
});
