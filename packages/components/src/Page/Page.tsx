import type { ReactElement, RefObject } from "react";
import React from "react";
import classnames from "classnames";
import { Breakpoints, useResizeObserver } from "@jobber/hooks";
import styles from "./Page.module.css";
import type {
  ButtonActionProps,
  PageActionButtonProps,
  PageActionsProps,
  PageBodyProps,
  PageComposableProps,
  PageHeaderContentProps,
  PageHeaderProps,
  PageIntroProps,
  PageLegacyProps,
  PageMenuProps,
  PageProps,
  PageSlotProps,
  PageSubtitleProps,
  PageTitleBarProps,
  PageTitleProps,
} from "./types";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Content } from "../Content";
import { Markdown } from "../Markdown";
import { Button, type ButtonProps } from "../Button";
import { Menu } from "../Menu";
import { Emphasis } from "../Emphasis";
import { filterDataAttributes } from "../sharedHelpers/filterDataAttributes";

/** Discriminates between the props-based API and the composable children API. */
function isLegacy(props: PageProps): props is PageLegacyProps {
  return "title" in props;
}

export function Page(props: PageLegacyProps): ReactElement;
export function Page(props: PageComposableProps): ReactElement;

export function Page(props: PageProps): ReactElement {
  const pageStyles = classnames(styles.page, styles[props.width ?? "standard"]);

  if (isLegacy(props)) {
    return <PageLegacy {...props} pageStyles={pageStyles} />;
  }

  return (
    <div className={pageStyles}>
      <Content>{props.children}</Content>
    </div>
  );
}

/** Props-based renderer. Preserves the original Page behavior for existing consumers. */
function PageLegacy({
  title,
  titleMetaData,
  intro,
  externalIntroLinks,
  subtitle,
  children,
  primaryAction,
  secondaryAction,
  moreActionsMenu = [],
  pageStyles,
  ...rest
}: PageLegacyProps & { readonly pageStyles: string }) {
  const dataAttrs = filterDataAttributes(rest);
  const [titleBarRef, { width: titleBarWidth = Breakpoints.large }] =
    useResizeObserver<HTMLDivElement>();

  const titleBarClasses = classnames(styles.titleBar, {
    [styles.small]: titleBarWidth > Breakpoints.smaller,
    [styles.medium]: titleBarWidth > Breakpoints.small,
    [styles.large]: titleBarWidth > Breakpoints.base,
  });

  const showMenu = moreActionsMenu.length > 0;
  const showActionGroup = showMenu || primaryAction || secondaryAction;

  return (
    <div className={pageStyles} {...dataAttrs}>
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
                    <Button
                      {...getActionProps(primaryAction)}
                      fullWidth={true}
                    />
                  </div>
                )}
                {secondaryAction && (
                  <div
                    className={styles.actionButton}
                    ref={secondaryAction.ref}
                  >
                    <Button
                      {...getActionProps(secondaryAction)}
                      fullWidth={true}
                      type="secondary"
                    />
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

/**
 * Groups the title area and actions into the page header layout.
 * Place non-action content (title, subtitle) inside `Page.HeaderContent`
 * and actions inside `Page.Actions`.
 */
function PageHeader({ children, ...rest }: PageHeaderProps) {
  const dataAttrs = filterDataAttributes(rest);
  const [titleBarRef, { width: titleBarWidth = Breakpoints.large }] =
    useResizeObserver<HTMLDivElement>();

  const titleBarClasses = classnames(styles.titleBar, {
    [styles.small]: titleBarWidth > Breakpoints.smaller,
    [styles.medium]: titleBarWidth > Breakpoints.small,
    [styles.large]: titleBarWidth > Breakpoints.base,
  });

  return (
    <div className={titleBarClasses} ref={titleBarRef} {...dataAttrs}>
      {children}
    </div>
  );
}

/** Wraps the title area (title, subtitle) inside `Page.Header`. Use when the header contains more than one content element to keep them stacked vertically. */
function PageHeaderContent({ children, ...rest }: PageHeaderContentProps) {
  const dataAttrs = filterDataAttributes(rest);

  return <div {...dataAttrs}>{children}</div>;
}

/**
 * Flex container for the page title and optional sibling elements such as
 * status badges. Use when you need to display metadata alongside the heading.
 *
 * @example
 * ```tsx
 * <Page.TitleBar>
 *   <Page.Title>Clients</Page.Title>
 *   <StatusLabel label="Active" status="success" />
 * </Page.TitleBar>
 * ```
 */
function PageTitleBar({ children, ...rest }: PageTitleBarProps) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <div className={styles.titleRow} {...dataAttrs}>
      {children}
    </div>
  );
}

/**
 * Renders the page heading as an H1. When metadata is present alongside the
 * title, wrap both in `Page.TitleBar`.
 */
function PageTitle({ children, ...rest }: PageTitleProps) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <Heading level={1} {...dataAttrs}>
      {children}
    </Heading>
  );
}

/** Secondary text below the title. Always applies default Text/Emphasis styling. */
function PageSubtitle({ children, ...rest }: PageSubtitleProps) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <div className={styles.subtitle} {...dataAttrs}>
      <Text size="large" variation="subdued">
        <Emphasis variation="bold">{children}</Emphasis>
      </Text>
    </div>
  );
}

/** Introduction text between the header and body. Always applies default Text styling. */
function PageIntro({ children }: PageIntroProps) {
  return <Text size="large">{children}</Text>;
}

/** Container for action buttons and menu. Applies responsive actionGroup layout. */
function PageActions({ children, ...rest }: PageActionsProps) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <div className={styles.actionGroup} {...dataAttrs}>
      {children}
    </div>
  );
}

/** Positional container for the primary action. Should contain a Button element, e.g. <Page.PrimaryButton>. */
function PageActionPrimary({ children, ref }: PageSlotProps) {
  return (
    <div className={styles.primaryAction} ref={ref}>
      {children}
    </div>
  );
}

/** Positional container for the secondary action. Should contain a Button element, e.g. <Page.SecondaryButton>. */
function PageActionSecondary({ children, ref }: PageSlotProps) {
  return (
    <div className={styles.actionButton} ref={ref}>
      {children}
    </div>
  );
}

/** Positional container for the menu action. Should contain Page.Menu or a custom Menu. */
function PageActionMenu({ children, ref }: PageSlotProps) {
  return (
    <div className={styles.actionButton} ref={ref}>
      {children}
    </div>
  );
}

/** Default primary Button with opinionated styling. Use inside Page.ActionPrimary. */
function PagePrimaryButton({
  ref,
  label,
  onClick,
  icon,
  disabled,
  loading,
  ariaLabel,
  ...rest
}: PageActionButtonProps) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <div ref={ref} {...dataAttrs}>
      <Button
        label={label}
        onClick={onClick}
        icon={icon}
        disabled={disabled}
        loading={loading}
        ariaLabel={ariaLabel}
        fullWidth={true}
      />
    </div>
  );
}

/** Default secondary Button with opinionated styling. Use inside Page.ActionSecondary. */
function PageSecondaryButton({
  ref,
  label,
  onClick,
  icon,
  disabled,
  loading,
  ariaLabel,
  ...rest
}: PageActionButtonProps) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <div ref={ref} {...dataAttrs}>
      <Button
        label={label}
        onClick={onClick}
        icon={icon}
        disabled={disabled}
        loading={loading}
        ariaLabel={ariaLabel}
        fullWidth={true}
        type="secondary"
      />
    </div>
  );
}

/**
 * "More Actions" menu with a default trigger button.
 * Consumers supply Menu.Item children (in case custom routing is needed,
 * e.g. wrapping Menu.Item with createLink() from TanStack Router).
 */
function PageMenu({
  children,
  triggerLabel = "More Actions",
  ...rest
}: PageMenuProps) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <div {...dataAttrs}>
      <Menu>
        <Menu.Trigger UNSAFE_style={{ display: "block" }}>
          <Button icon="more" label={triggerLabel} type="secondary" fullWidth />
        </Menu.Trigger>
        <Menu.Content>{children}</Menu.Content>
      </Menu>
    </div>
  );
}

/** Main content area of the page. */
function PageBody({ children }: PageBodyProps) {
  return <Content>{children}</Content>;
}

export const getActionProps = (
  actionProps?: ButtonActionProps,
): ButtonProps => {
  const buttonProps = (actionProps ?? {}) as ButtonProps & {
    ref?: RefObject<HTMLDivElement | null>;
  };
  if (actionProps?.ref) delete buttonProps.ref;

  return buttonProps;
};

Page.Header = PageHeader;
Page.HeaderContent = PageHeaderContent;
Page.TitleBar = PageTitleBar;
Page.Title = PageTitle;
Page.Subtitle = PageSubtitle;
Page.Intro = PageIntro;
Page.Actions = PageActions;
Page.ActionPrimary = PageActionPrimary;
Page.ActionSecondary = PageActionSecondary;
Page.ActionMenu = PageActionMenu;
Page.PrimaryButton = PagePrimaryButton;
Page.SecondaryButton = PageSecondaryButton;
Page.Menu = PageMenu;
Page.Body = PageBody;
