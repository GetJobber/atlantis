import ReactMarkdown from "react-markdown";
import React, { ReactNode } from "react";
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

interface HeadingRendererProps {
  readonly level: 1 | 2 | 3 | 4 | 5 | 6;
  readonly children: ReactNode;
}

interface BaseRendererProps {
  children: ReactNode;
}

export function Markdown({ content, externalLink, basicUsage }: MarkdownProps) {
  const props = {
    ...(basicUsage && {
      disallowedTypes: [
        "paragraph",
        "heading",
        "table",
        "list",
        "code",
        "image",
      ],
      unwrapDisallowed: true,
    }),
  };

  return (
    <ReactMarkdown
      {...props}
      source={content}
      linkTarget={externalLink ? "_blank" : undefined}
      renderers={{
        root: renderWrapper,
        paragraph: renderParagraph,
        emphasis: renderEmphasis,
        strong: renderStrong,
        heading: renderHeading,
      }}
    />
  );

  function renderWrapper({ children }: BaseRendererProps) {
    if (basicUsage) {
      return <>{children}</>;
    }

    return <Content>{children}</Content>;
  }

  function renderParagraph({ children }: BaseRendererProps) {
    return <Text>{children}</Text>;
  }

  function renderEmphasis({ children }: BaseRendererProps) {
    return <Emphasis variation="italic">{children}</Emphasis>;
  }

  function renderStrong({ children }: BaseRendererProps) {
    return <Emphasis variation="bold">{children}</Emphasis>;
  }

  function renderHeading({ level, children }: HeadingRendererProps) {
    if (level === 6) {
      return <h6>{children}</h6>;
    }
    return <Heading level={level}>{children}</Heading>;
  }
}
