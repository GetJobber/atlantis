import type { ReactElement, ReactNode, RefObject } from "react";
import React, { Children, isValidElement } from "react";
import classnames from "classnames";
import { Breakpoints, useResizeObserver } from "@jobber/hooks";
import styles from "./Page.module.css";
import type {
  ButtonActionProps,
  PageActionButtonProps,
  PageActionsProps,
  PageBodyProps,
  PageComposableProps,
  PageHeaderProps,
  PageIntroProps,
  PageLegacyProps,
  PageMenuProps,
  PageProps,
  PageSlotProps,
  PageSubtitleProps,
  PageTitleMetaDataProps,
  PageTitleProps,
} from "./types";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Content } from "../Content";
import { Markdown } from "../Markdown";
import { Button, type ButtonProps } from "../Button";
import { Menu } from "../Menu";
import { Emphasis } from "../Emphasis";
import { Container } from "../Container";
import { filterDataAttributes } from "../sharedHelpers/filterDataAttributes";
import type { CommonAtlantisProps } from "../sharedHelpers/types";

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

/** Groups title, subtitle, and actions. Separates Page.Actions for layout positioning. */
function PageHeader({ children, ...rest }: PageHeaderProps) {
  const dataAttrs = filterDataAttributes(rest);
  let actionsElement: ReactNode = null;
  const otherChildren: ReactNode[] = [];

  Children.forEach(children, child => {
    if (isValidElement(child) && child.type === PageActions) {
      actionsElement = child;
    } else {
      otherChildren.push(child);
    }
  });

  return (
    <Content>
      <Container
        name="page-titlebar"
        autoWidth
        dataAttributes={dataAttrs as CommonAtlantisProps["dataAttributes"]}
      >
        <Container.Apply autoWidth>
          <div className={styles.titleBar}>
            <div>{otherChildren}</div>
            {actionsElement}
          </div>
        </Container.Apply>
      </Container>
    </Content>
  );
}

/** Renders the page heading (H1). Extracts Page.TitleMetaData from children for layout. */
function PageTitle({ children, ...rest }: PageTitleProps) {
  const dataAttrs = filterDataAttributes(rest);
  let metaDataElement: ReactNode = null;
  const otherChildren: ReactNode[] = [];

  Children.forEach(children, child => {
    if (isValidElement(child) && child.type === PageTitleMetaData) {
      metaDataElement = child;
    } else {
      otherChildren.push(child);
    }
  });

  if (metaDataElement) {
    return (
      <div className={styles.titleRow} {...dataAttrs}>
        <Heading level={1}>{otherChildren}</Heading>
        {metaDataElement}
      </div>
    );
  }

  return <Heading level={1}>{otherChildren}</Heading>;
}

/** Metadata displayed alongside the page title (e.g. status badges). Use inside Page.Title. */
function PageTitleMetaData({ children }: PageTitleMetaDataProps) {
  return <>{children}</>;
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

/** Positional slot for the primary action. Renders children in the primary action position. */
function PagePrimarySlot({ children, ref }: PageSlotProps) {
  return (
    <div className={styles.primaryAction} ref={ref}>
      {children}
    </div>
  );
}

/** Positional slot for the secondary action. Renders children in the secondary action position. */
function PageSecondarySlot({ children, ref }: PageSlotProps) {
  return (
    <div className={styles.actionButton} ref={ref}>
      {children}
    </div>
  );
}

/** Positional slot for the tertiary action (typically the menu). */
function PageTertiarySlot({ children, ref }: PageSlotProps) {
  return (
    <div className={styles.actionButton} ref={ref}>
      {children}
    </div>
  );
}

/** Primary action button with default styling. Use inside Page.PrimarySlot or Page.Actions. */
function PagePrimaryAction({
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

/** Secondary action button with default styling. Use inside Page.SecondarySlot or Page.Actions. */
function PageSecondaryAction({
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
        <Menu.Trigger>
          <Button icon="more" label={triggerLabel} type="secondary" />
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
Page.Title = PageTitle;
Page.TitleMetaData = PageTitleMetaData;
Page.Subtitle = PageSubtitle;
Page.Intro = PageIntro;
Page.Actions = PageActions;
Page.PrimarySlot = PagePrimarySlot;
Page.SecondarySlot = PageSecondarySlot;
Page.TertiarySlot = PageTertiarySlot;
Page.PrimaryAction = PagePrimaryAction;
Page.SecondaryAction = PageSecondaryAction;
Page.Menu = PageMenu;
Page.Body = PageBody;
