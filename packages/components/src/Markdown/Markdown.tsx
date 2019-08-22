/* eslint-disable react/display-name */
import ReactMarkdown from "react-markdown";
import React, { ReactNode } from "react";
import { Text } from "../Text";
import { Emphasis } from "../Emphasis";
import { Heading } from "../Heading";

interface MarkdownProps {
  /**
   * Text to display.
   */
  readonly text: string;
}

interface HeadingProps {
  readonly level: 1 | 2 | 3 | 4 | 5 | 6;
  readonly children: ReactNode;
}

interface MarkdownRendererProps {
  children: ReactNode;
}

export function Markdown({ text }: MarkdownProps) {
  return (
    <ReactMarkdown
      source={text}
      renderers={{
        paragraph: ({ children }: MarkdownRendererProps) => (
          <Text>{children}</Text>
        ),
        emphasis: ({ children }: MarkdownRendererProps) => (
          <Emphasis variation="italic">{children}</Emphasis>
        ),
        strong: ({ children }: MarkdownRendererProps) => (
          <Emphasis variation="bold">{children}</Emphasis>
        ),
        heading: ({ level, children }: HeadingProps) => {
          if (level === 6) {
            return <h6>{children}</h6>;
          }
          return <Heading level={level}>{children}</Heading>;
        },
      }}
    />
  );
}
