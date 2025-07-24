import React, { ReactNode } from "react";
import classnames from "classnames";
import { XOR } from "ts-xor";
import {
  Breakpoints,
  useResizeObserver,
} from "@jobber/hooks/useResizeObserver";
import styles from "./Page.module.css";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Content } from "../Content";
import { Markdown } from "../Markdown";
import { Button, ButtonProps } from "../Button";
import { Menu, SectionProps } from "../Menu";
import { Emphasis } from "../Emphasis";

export type ButtonActionProps = ButtonProps & {
  ref?: React.RefObject<HTMLDivElement>;
};

interface PageFoundationProps {
  readonly children: ReactNode | ReactNode[];

  /**
   * Title of the page.
   *
   * Supports any React node. If a string is provided, it will be rendered as an H1 heading.
   * Otherwise it will be rendered as is.
   *
   * **Important**: If you're passing a custom element, it must include an H1-level heading within it.
   * Ideally <Heading level={1}> should be used here.
   */
  readonly title: ReactNode;

  /**
   * TitleMetaData component to be displayed
   * next to the title. Only compatible with string titles.
   */
  readonly titleMetaData?: ReactNode;

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
  readonly primaryAction?: ButtonActionProps;

  /**
   * Page title secondary action button settings.
   */
  readonly secondaryAction?: ButtonActionProps;

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

export function Page({
  title,
  titleMetaData,
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
  const showActionGroup = showMenu || primaryAction || secondaryAction;

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
              {typeof title === "string" && titleMetaData ? (
                <div className={styles.titleRow}>
                  <Heading level={1}>{title}</Heading>
                  {titleMetaData}
                </div>
              ) : typeof title === "string" ? (
                <Heading level={1}>{title}</Heading>
              ) : (
                title
              )}
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
                  <div className={styles.primaryAction} ref={primaryAction.ref}>
                    <Button {...getActionProps(primaryAction)} />
                  </div>
                )}
                {secondaryAction && (
                  <div
                    className={styles.actionButton}
                    ref={secondaryAction.ref}
                  >
                    <Button {...getActionProps(secondaryAction)} />
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

export const getActionProps = (actionProps: ButtonActionProps): ButtonProps => {
  const buttonProps = { ...actionProps };
  if (actionProps.ref) delete buttonProps.ref;

  return buttonProps;
};
