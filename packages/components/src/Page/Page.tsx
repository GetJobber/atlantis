import React, { ReactNode } from "react";
import classnames from "classnames";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Content } from "../Content";
import { Markdown } from "../Markdown";
import styles from "./Page.css";

interface PageProps {
  readonly children: ReactNode | ReactNode[];

  /**
   * Content of the page. This supports basic markdown node types such as
   * `_italic_`, `**bold**`, and `[link name](url)`
   */
  readonly intro: string;

  /**
   * Title of the page.
   */
  readonly title: string;

  /**
   * Determines the width of the page.
   *
   * Fill makes the width grow to 100%.
   *
   * Standard caps out at 1280px.
   *
   * Narrow caps out at 1024px.
   *
   * @default standard
   */
  readonly width?: "fill" | "standard" | "narrow";
}

export function Page({
  title,
  intro,
  children,
  width = "standard",
}: PageProps) {
  const className = classnames(styles.page, styles[width]);

  return (
    <div className={className}>
      <Content>
        <Content spacing="large">
          <Heading level={1}>{title}</Heading>
          <Text variation="intro">
            <Markdown content={intro} basicUsage={true} />
          </Text>
        </Content>
        <Content>{children}</Content>
      </Content>
    </div>
  );
}
