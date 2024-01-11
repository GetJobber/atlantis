import React from "react";
import MarkdownToJSX from "markdown-to-jsx";
import { useMarkdownOverrides } from "./useMarkdownOverrides";
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

/**
 *
 *  Our Markdown component is a thin, opinionated wrapper around markdown-to-jsx. It
 *  used to be a wrapper around react-markdown, but we switched to
 *  markdown-to-jsx because it has better support for server-side rendering.
 *  If you need more control over the markdown rendering, you can use
 *  markdown-to-jsx directly with a modified version of the configs found in
 *  useMarkdownOverrides.tsx.
 *
 * @param props
 * @returns
 */
export function Markdown({ content, externalLink, basicUsage }: MarkdownProps) {
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

  const overrides = useMarkdownOverrides(externalLink, basicUsage);

  return (
    <Tag>
      <MarkdownToJSX
        {...props}
        linkTarget={externalLink ? "_blank" : undefined}
        options={{
          // We wrap the content in a fragment to avoid the extra div that
          // markdown-to-jsx adds by default.
          wrapper: React.Fragment,
          // Force markdown-to-jsx to render the content as a block element.
          // This is necessary to avoid the extra span that markdown-to-jsx
          // adds by default.
          forceBlock: true,
          overrides,
        }}
      >
        {content}
      </MarkdownToJSX>
    </Tag>
  );
}
