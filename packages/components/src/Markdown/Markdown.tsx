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
}

interface HeadingRendererProps {
  readonly level: 1 | 2 | 3 | 4 | 5 | 6;
  readonly children: ReactNode;
}

interface BaseRendererProps {
  children: ReactNode;
}

export function Markdown({ content, externalLink }: MarkdownProps) {
  return (
    <Content>
      <ReactMarkdown
        source={content}
        linkTarget={externalLink ? "_blank" : undefined}
        renderers={{
          paragraph: renderParagraph,
          emphasis: renderEmphasis,
          strong: renderStrong,
          heading: renderHeading,
        }}
      />
    </Content>
  );

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
