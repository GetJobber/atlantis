# Markdown

# Markdown

Markdown component is a text-to-HTML conversion tool with a twist! Because,
instead of using semantic HTML tags, it uses our own atlantis component for
paragraph, bold, italic, and heading.

## Web Component Code

```tsx
Markdown Text Web React import type { DetailedHTMLProps, HTMLAttributes } from "react";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Text } from "../Text";
import { Emphasis } from "../Emphasis";
import { Heading } from "../Heading";
import { Content } from "../Content";

interface MarkdownProps {
  /**
   * Rich text content.
   */
  readonly content: string;

  /**
   * Open all links in new tab.
   */
  readonly externalLink?: boolean;

  /**
   * Only allow basic inline elements such as `_italic_`, `**bold**`, and
   * `[link name](url)`
   */
  readonly basicUsage?: boolean;

  /**
   *
   * Callback that gets called when a link in the text is clicked.
   * @param target the target element that was clicked
   */
  readonly onLinkClick?: (target: HTMLAnchorElement) => void;
}

export function Markdown({
  content,
  externalLink,
  basicUsage,
  onLinkClick,
}: MarkdownProps) {
  const props = {
    ...(basicUsage && {
      disallowedElements: [
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "table",
        "ul",
        "li",
        "code",
        "image",
      ],
      unwrapDisallowed: true,
    }),
  };

  const Tag = basicUsage ? React.Fragment : Content;

  return (
    <Tag>
      <ReactMarkdown
        {...props}
        linkTarget={externalLink ? "_blank" : undefined}
        components={{
          p: renderParagraph,
          strong: renderStrong,
          em: renderEmphasis,
          h1: renderHeading(1),
          h2: renderHeading(2),
          h3: renderHeading(3),
          h4: renderHeading(4),
          h5: renderHeading(5),
          a: renderLink(onLinkClick, !!externalLink),
        }}
      >
        {content}
      </ReactMarkdown>
    </Tag>
  );
}

type HTMLProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

function renderParagraph({ children }: HTMLProps) {
  return <Text>{children}</Text>;
}

function renderStrong({ children }: HTMLProps) {
  return <Emphasis variation="bold">{children}</Emphasis>;
}

function renderEmphasis({ children }: HTMLProps) {
  return <Emphasis variation="italic">{children}</Emphasis>;
}

function renderHeading(level: 1 | 2 | 3 | 4 | 5) {
  function buildHeading({ children }: HTMLProps) {
    return <Heading level={level}>{children}</Heading>;
  }

  return buildHeading;
}

function renderLink(
  onLinkClick: ((target: HTMLAnchorElement) => void) | undefined,
  externalLink: boolean,
) {
  // eslint-disable-next-line react/display-name
  return ({
    children,
    href,
  }: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >) => (
    <a
      href={href}
      onClick={event => {
        return onLinkClick?.(event.target as HTMLAnchorElement);
      }}
      target={externalLink ? "_blank" : undefined}
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

```

## Props

### Web Props

| Prop                                              | Type                                  | Required | Default  | Description                                                          |
| ------------------------------------------------- | ------------------------------------- | -------- | -------- | -------------------------------------------------------------------- |
| `content`                                         | `string`                              | ✅       | `_none_` | Rich text content.                                                   |
| `externalLink`                                    | `boolean`                             | ❌       | `_none_` | Open all links in new tab.                                           |
| `basicUsage`                                      | `boolean`                             | ❌       | `_none_` | Only allow basic inline elements such as `_italic_`, `**bold**`, and |
| `[link name](url)`                                |
| `onLinkClick`                                     | `(target: HTMLAnchorElement) => void` | ❌       | `_none_` | Callback that gets called when a link in the text is clicked.        |
| @param target the target element that was clicked |

## Categories

- Text & Typography

## Web Test Code

```typescript
Markdown Text Web React Test Testing Jest import { fireEvent, render } from "@testing-library/react";
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

describe("links", () => {
  it("calls the callback when onLinkClick is provided", () => {
    const onLinkClick = jest.fn();
    const link = "http://to.somewhere/";
    const { queryByText } = render(
      <Markdown
        content={`This is a [link](${link})`}
        onLinkClick={onLinkClick}
      />,
    );

    fireEvent.click(queryByText("link") as HTMLElement);

    expect(onLinkClick).toHaveBeenCalledTimes(1);
    expect((onLinkClick.mock.calls[0][0] as HTMLAnchorElement).href).toBe(link);
  });

  it("opens links in a new tab when externalLink is true", () => {
    const link = "http://to.somewhere/";
    const { queryByText } = render(
      <Markdown content={`This [link](${link})`} externalLink />,
    );

    expect((queryByText("link") as HTMLAnchorElement).target).toBe("_blank");
    expect((queryByText("link") as HTMLAnchorElement).href).toBe(link);
  });
});

```

## Component Path

`/components/Markdown`

---

_Generated on 2025-08-21T17:35:16.369Z_
