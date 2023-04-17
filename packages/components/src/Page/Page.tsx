import React, { ReactNode } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import {
  Breakpoints,
  useResizeObserver,
} from "@jobber/hooks/dist/useResizeObserver";
import styles from "./Page.css";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Content } from "../Content";
import { Markdown } from "../Markdown";
import { Button, ButtonProps } from "../Button";
import { Menu, SectionProps } from "../Menu";
import { Emphasis } from "../Emphasis";

interface PageFoundationProps {
  readonly children: ReactNode | ReactNode[];

  /**
   * Title of the page.
   */
  readonly title: string;

  /**
   * Subtitle of the page.
   */
  readonly subtitle?: string;

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

interface PageWithIntroProps extends PageFoundationProps {
  /**
   * Content of the page. This supports basic markdown node types
   * such as `_italic_`, `**bold**`, and `[link name](url)`.
   */
  readonly intro: string;

  /**
   * Causes any markdown links in the `intro` prop to open in a new
   * tab, i.e. with `target="_blank"`.
   *
   * Can only be used if `intro` prop is also specified.
   *
   * Defaults to `false`.
   */
  readonly externalIntroLinks?: boolean;
}

export type PageProps = XOR<PageFoundationProps, PageWithIntroProps>;

// eslint-disable-next-line max-statements
export function Page({
  title,
  intro,
  externalIntroLinks,
  subtitle,
  children,
  width = "standard",
  primaryAction,
  secondaryAction,
  moreActionsMenu = [],
}: PageProps) {
  const pageStyles = classnames(styles.page, styles[width]);
  const [titleBarRef, { width: titleBarWidth = Breakpoints.large }] =
    useResizeObserver<HTMLDivElement>();

  const titleBarClasses = classnames(styles.titleBar, {
    [styles.small]: titleBarWidth > Breakpoints.smaller,
    [styles.medium]: titleBarWidth > Breakpoints.small,
    [styles.large]: titleBarWidth > Breakpoints.base,
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
        <Content>
          <div className={titleBarClasses} ref={titleBarRef}>
            <div>
              <Heading level={1}>{title}</Heading>
              {subtitle && (
                <div className={styles.subtitle}>
                  <Text size="large" variation="subdued">
                    <Emphasis variation="bold">
                      <Markdown content={subtitle} basicUsage={true} />
                    </Emphasis>
                  </Text>
                </div>
              )}
            </div>
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
          {intro && (
            <Text size="large">
              <Markdown
                content={intro}
                basicUsage={true}
                externalLink={externalIntroLinks}
              />
            </Text>
          )}
        </Content>
        <Content>{children}</Content>
      </Content>
    </div>
  );
}
