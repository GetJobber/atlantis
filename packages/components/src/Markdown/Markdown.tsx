import ReactMarkdown from "react-markdown";
import React, { ReactNode } from "react";
import { Text } from "../Text";
import { Emphasis } from "../Emphasis";
import { Heading } from "../Heading";
import { Content } from "../Content";

interface MarkdownProps {
  /**
   * Text to display.
   */
  readonly content: string;

  /**
   * Render HTML tags inside the content. Only use this when you're sure that
   * the content is not user-generated. If not, that might cause security
   * issues.
   * */
  readonly renderHTML?: boolean;

  /**
   * Open all links in new tab. If you require to have a mix of links that opens
   * in new tab, please write it as a pure HTML instead and enable `renderHTML`.
   */
  readonly externalLink?: boolean;
}

interface HeadingProps {
  readonly level: 1 | 2 | 3 | 4 | 5 | 6;
  readonly children: ReactNode;
}

interface MarkdownRendererProps {
  children: ReactNode;
}

export function Markdown({
  content,
  renderHTML = false,
  externalLink,
}: MarkdownProps) {
  return (
    <Content>
      <ReactMarkdown
        source={content}
        escapeHtml={!renderHTML}
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

  function renderParagraph({ children }: MarkdownRendererProps) {
    return <Text>{children}</Text>;
  }

  function renderEmphasis({ children }: MarkdownRendererProps) {
    return <Emphasis variation="italic">{children}</Emphasis>;
  }

  function renderStrong({ children }: MarkdownRendererProps) {
    return <Emphasis variation="bold">{children}</Emphasis>;
  }

  function renderHeading({ level, children }: HeadingProps) {
    if (level === 6) {
      return <h6>{children}</h6>;
    }
    return <Heading level={level}>{children}</Heading>;
  }
}
