import { render } from "@testing-library/react";
import React from "react";
import { Markdown } from ".";

it("renders Text Component", () => {
  const { container } = render(<Markdown content="Paragraph" />);
  expect(container).toMatchSnapshot();
});

it("renders Italicized Component", () => {
  const { container } = render(<Markdown content="_Italicized Foo_" />);
  expect(container).toMatchSnapshot();
});

it("renders Bold Component", () => {
  const { container } = render(<Markdown content="**Bold Foo**" />);
  expect(container).toMatchSnapshot();
});

it("renders Level 1 Heading Component", () => {
  const { container } = render(<Markdown content="# Heading 1" />);
  expect(container).toMatchSnapshot();
});

it("renders Level 2 Heading Component", () => {
  const { container } = render(<Markdown content="## Heading 2" />);
  expect(container).toMatchSnapshot();
});

it("renders Level 3 Heading Component", () => {
  const { container } = render(<Markdown content="### Heading 3" />);
  expect(container).toMatchSnapshot();
});

it("renders Level 4 Heading Component", () => {
  const { container } = render(<Markdown content="#### Heading 4" />);
  expect(container).toMatchSnapshot();
});

it("renders Level 5 Heading Component", () => {
  const { container } = render(<Markdown content="##### Heading 5" />);
  expect(container).toMatchSnapshot();
});

it("renders Level 6 Heading Component", () => {
  const { container } = render(<Markdown content="###### Heading " />);
  expect(container).toMatchSnapshot();
});

it("renders a combination of Markdown components", () => {
  const content = `# This is a paragraph.

  The paragraph has some **bold text** and some _italicized text_.

  This is the end of this paragraph.`;
  const { container } = render(<Markdown content={content} />);
  expect(container).toMatchSnapshot();
});

it("renders a without headings, paragraph, and wrapping content", () => {
  const content = `# No heading should show up

  This should just be pure string with **bold text** and some _italicized text_
  and of course a [link](http://to.somewhere)`;
  const { container } = render(
    <Markdown content={content} basicUsage={true} />,
  );
  expect(container).toMatchSnapshot();
});

describe("custom components", () => {
  it("uses the provided components for the generated HTML", () => {
    const { queryByTestId } = render(
      <Markdown
        content="This is a [link](http://to.somewhere)"
        components={{
          a: ({ href, children }) => (
            <a href={href} data-testid="foo-bar">
              {children}
            </a>
          ),
        }}
      />,
    );

    expect(queryByTestId("foo-bar")).not.toBeNull();
  });

  it("overrides the default components", () => {
    const { queryByTestId } = render(
      <Markdown
        content="# A heading"
        components={{
          // Make all h1's be h2's
          h1: ({ children }) => <h2 data-testid="foo-bar">{children}</h2>,
        }}
      />,
    );

    expect(queryByTestId("foo-bar")).not.toBeNull();
    expect(queryByTestId("foo-bar")?.nodeName).toEqual("H2");
  });
});
