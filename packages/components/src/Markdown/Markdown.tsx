import type { DetailedHTMLProps, HTMLAttributes } from "react";
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
