import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from "react";
import ReactMarkdown, { MarkdownToJSX } from "markdown-to-jsx";
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
}
const NoSpan = {
  component: ({ children }: PropsWithChildren) => <>{children}</>,
  props: {},
};

export function Markdown({
  content,
  externalLink,
  basicUsage,
  ...props
}: MarkdownProps) {
  const Tag = basicUsage ? React.Fragment : Content;
  const basicOverrides: MarkdownToJSX.Overrides = {
    p: NoSpan,
    h1: NoSpan,
    div: NoSpan,
    h2: NoSpan,
    h3: NoSpan,
    h4: NoSpan,
    h5: NoSpan,
    h6: NoSpan,
    table: NoSpan,
    ul: NoSpan,
    li: NoSpan,
    code: (children, ...args) => <code {...args}>{children}</code>,
    strong: renderStrong,
    em: renderEmphasis,
    image: NoSpan,
    a: {
      component: ({ children, ...rest }: PropsWithChildren) => (
        <a {...rest}>{children}</a>
      ),
      props: { target: externalLink ? "_blank" : undefined },
    },
  };

  const defaultOverrides: MarkdownToJSX.Overrides = {
    code: (children, ...args) => <code {...args}>{children}</code>,
    p: renderParagraph,
    strong: renderStrong,
    span: NoSpan,
    div: NoSpan,
    em: renderEmphasis,
    h1: renderHeading(1),
    h2: renderHeading(2),
    h3: renderHeading(3),
    h4: renderHeading(4),
    h5: renderHeading(5),
    h6: renderHeading(6),
    a: {
      component: ({ children, ...rest }: PropsWithChildren) => (
        <a {...rest}>{children}</a>
      ),
      props: { target: externalLink ? "_blank" : undefined },
    },
  };

  return (
    <Tag>
      <ReactMarkdown
        {...props}
        options={{
          overrides: basicUsage ? basicOverrides : defaultOverrides,
          forceBlock: true,
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

function renderHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  function buildHeading({ children }: HTMLProps) {
    return <Heading level={level}>{children}</Heading>;
  }

  return buildHeading;
}
