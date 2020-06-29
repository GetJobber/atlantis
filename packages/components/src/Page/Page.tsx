import React, { ReactNode } from "react";
import classnames from "classnames";
import { useResizeObserver } from "@jobber/hooks";
import styles from "./Page.css";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Content } from "../Content";
import { Markdown } from "../Markdown";
import { Button, ButtonProps } from "../Button";
import { Menu, SectionProps } from "../Menu";

export interface PageProps {
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

  /**
   * Page title primary action button settings.
   */
  readonly primaryAction?: ButtonProps;

  /**
   * Page title secondary action button settings.
   *   Only shown if there is a primaryAction.
   */
  readonly secondaryAction?: ButtonProps;

  /**
   * Page title Action menu.
   */
  readonly moreActionsMenu?: SectionProps[];
}

const pageSizes = {
  small: 265,
  base: 500,
  large: 750,
};

// eslint-disable-next-line max-statements
export function Page({
  title,
  intro,
  children,
  width = "standard",
  primaryAction,
  secondaryAction,
  moreActionsMenu = [],
}: PageProps) {
  const pageStyles = classnames(styles.page, styles[width]);
  const [titleBarRef, { width: titleBarWidth }] = useResizeObserver<
    HTMLDivElement
  >({ width: pageSizes });

  console.log("TITLEWIDTH", titleBarWidth);

  const titleBarClasses = classnames(styles.titleBar, {
    [styles.small]: titleBarWidth && titleBarWidth === "small",
    [styles.medium]: titleBarWidth && titleBarWidth === "base",
    [styles.large]: titleBarWidth && titleBarWidth === "large",
  });

  const showMenu = moreActionsMenu.length > 0;
  const showActionGroup = showMenu || primaryAction;

  if (primaryAction != undefined) {
    primaryAction = Object.assign({ fullWidth: true }, primaryAction);
  }

  if (secondaryAction != undefined) {
    secondaryAction = Object.assign(
      { type: "secondary", fullWidth: true },
      secondaryAction,
    );
  }

  if (secondaryAction != undefined) {
    secondaryAction = Object.assign(
      { type: "secondary", fullWidth: true },
      secondaryAction,
    );
  }

  return (
    <div className={pageStyles}>
      <Content>
        <Content spacing="large">
          <div className={titleBarClasses} ref={titleBarRef}>
            <Heading level={1}>{title}</Heading>
            {showActionGroup && (
              <div className={styles.actionGroup}>
                {primaryAction && (
                  <div className={styles.primaryAction}>
                    <Button {...primaryAction} />
                  </div>
                )}
                {secondaryAction && (
                  <div className={styles.actionButton}>
                    <Button {...secondaryAction} />
                  </div>
                )}
                {showMenu && (
                  <div className={styles.actionButton}>
                    <Menu items={moreActionsMenu}></Menu>
                  </div>
                )}
              </div>
            )}
          </div>
          <Text variation="intro">
            <Markdown content={intro} basicUsage={true} />
          </Text>
        </Content>
        <Content>{children}</Content>
      </Content>
    </div>
  );
}
