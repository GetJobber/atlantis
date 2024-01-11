import React, { PropsWithChildren } from "react";
import { MarkdownToJSX } from "markdown-to-jsx";
import { Text } from "../Text";
import { Emphasis } from "../Emphasis";
import { Heading } from "../Heading";

/**
 * Basic prevents the use of paragraph and h1 elements while wrapping
 * strong, and em in Atlantis styles. Anchor tags can be
 * made to open in a new tab via the externalLink prop.
 * @param externalLink Will open any anchor tags in a new tab.
 * @returns
 */
function basicOverrides(externalLink?: boolean) {
  return {
    p: ({ children }) => <>{children}</>,
    h1: ({ children }) => <>{children}</>,
    strong: renderStrong,
    em: renderEmphasis,
    a: renderAnchor({ externalLink }),
  } as MarkdownToJSX.Overrides;
}

/**
 * This is setup to mimic the output of our old react-markdown setup for compatibility purposes.
 * We sub in Atlantis components here for most of the markdown elements.
 * @param externalLink Will open any anchor tags in a new tab.
 * @returns MarkdownToJSX.Overrides
 */
function defaultOverrides(externalLink?: boolean) {
  return {
    p: ({ children }) => <Text>{children}</Text>,
    strong: renderStrong,
    em: renderEmphasis,
    h1: renderHeading(1),
    h2: renderHeading(2),
    h3: renderHeading(3),
    h4: renderHeading(4),
    h5: renderHeading(5),
    h6: {
      component: ({ children }: PropsWithChildren) => <h6>{children}</h6>,
    },
    a: renderAnchor({ externalLink }),
  } as MarkdownToJSX.Overrides;
}

/**
 * Simple wrapper to open anchor tags in a new tab if externalLink is true.
 * @param props
 * @returns
 */
function renderAnchor({
  children,
  externalLink,
  ...rest
}: PropsWithChildren & { externalLink?: boolean }) {
  return (
    <a {...rest} target={externalLink ? "_blank" : undefined}>
      {children}
    </a>
  );
}

/**
 * Renders the Atlantis Empahsis component with the bold variation.
 * @param props
 * @returns
 */
function renderStrong({ children }: PropsWithChildren) {
  return <Emphasis variation="bold">{children}</Emphasis>;
}

/**
 * Renders the Atlantis Empahsis component with the italic variation.
 * @param props
 * @returns
 */
function renderEmphasis({ children }: PropsWithChildren) {
  return <Emphasis variation="italic">{children}</Emphasis>;
}

/**
 * Renders the Atlantis Heading component with the specified level.
 * @param level Heading Level to render
 * @returns
 */
function renderHeading(level: 1 | 2 | 3 | 4 | 5) {
  function buildHeading({ children }: PropsWithChildren) {
    return <Heading level={level}>{children}</Heading>;
  }

  return buildHeading;
}

// Quick toggle to decide bteewen basic and default overrides
// and to pass along our decision to make the link external
// or not.
export function useMarkdownOverrides(
  externalLink?: boolean,
  basicUsage?: boolean,
) {
  return basicUsage
    ? basicOverrides(externalLink)
    : defaultOverrides(externalLink);
}
