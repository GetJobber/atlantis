import ReactMarkdown from "react-markdown";
import React, { Fragment, PropsWithChildren, ReactElement } from "react";
import { BaseElementProps } from "./BaseElementProps";
import {
  Emphasis,
  Heading,
  HorizontalRule,
  Paragraph,
  Strong,
} from "./components";
import { Content } from "../Content";

interface MarkdownProps {
  /**
   * Rich text content.
   */
  readonly content: string;
  usage?: "basic";
  components?: {
    a?(props: PropsWithChildren<AnchorProps>): ReactElement;
  };
}

interface AnchorProps extends BaseElementProps, Record<string, any> {
  href?: string;
}

export function Markdown({ content, usage, components }: MarkdownProps) {
  const Wrapper = usage == "basic" ? Fragment : Content;

  return (
    <Wrapper>
      <ReactMarkdown
        components={{
          h1: Heading,
          h2: Heading,
          h3: Heading,
          h4: Heading,
          h5: Heading,
          h6: Heading,
          p: Paragraph,
          strong: Strong,
          em: Emphasis,
          hr: HorizontalRule,
          ...components,
        }}
        {...(usage == "basic" && { disallowedElements: ["a", "img"] })}
      >
        {content}
      </ReactMarkdown>
    </Wrapper>
  );
}
