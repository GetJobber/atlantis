import React from "react";
import renderer from "react-test-renderer";
import { Markdown } from ".";

it("renders Text Component", () => {
  const tree = renderer.create(<Markdown content="Paragraph" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Italicized Component", () => {
  const tree = renderer
    .create(<Markdown content="_Italicized Foo_" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Bold Component", () => {
  const tree = renderer.create(<Markdown content="**Bold Foo**" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Level 1 Heading Component", () => {
  const tree = renderer.create(<Markdown content="# Heading 1" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Level 2 Heading Component", () => {
  const tree = renderer.create(<Markdown content="## Heading 2" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Level 3 Heading Component", () => {
  const tree = renderer.create(<Markdown content="### Heading 3" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Level 4 Heading Component", () => {
  const tree = renderer.create(<Markdown content="#### Heading 4" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Level 5 Heading Component", () => {
  const tree = renderer.create(<Markdown content="##### Heading 5" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders Level 6 Heading Component", () => {
  const tree = renderer.create(<Markdown content="###### Heading " />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a combination of Markdown components", () => {
  const content = `# This is a paragraph.

  The paragraph has some **bold text** and some _italicized text_.

  This is the end of this paragraph.`;
  const tree = renderer.create(<Markdown content={content} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a without headings, paragraph, and wrapping content", () => {
  const content = `# No heading should show up

  This should just be pure string with **bold text** and some _italicized text_
  and of course a [link](http://to.somewhere)`;
  const tree = renderer
    .create(<Markdown content={content} basicUsage={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
