import type { ReactElement, ReactNode, RefObject } from "react";
import React, { Children, isValidElement } from "react";
import classnames from "classnames";
import { Breakpoints, useResizeObserver } from "@jobber/hooks";
import styles from "./Page.module.css";
import type {
  ButtonActionProps,
  PageComposableProps,
  PageLegacyProps,
  PageProps,
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
function PageHeader({ children, ...rest }: { readonly children: ReactNode }) {
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

/** Renders the page heading (H1). Accepts optional `metadata` displayed alongside (e.g. status badges). */
function PageTitle({
  children,
  metadata,
  ...rest
}: {
  readonly children: ReactNode;
  readonly metadata?: ReactNode;
}) {
  const dataAttrs = filterDataAttributes(rest);

  if (metadata) {
    return (
      <div className={styles.titleRow} {...dataAttrs}>
        <Heading level={1}>{children}</Heading>
        {metadata}
      </div>
    );
  }

  return (
    <div {...dataAttrs}>
      <Heading level={1}>{children}</Heading>
    </div>
  );
}

/** Secondary text below the title. Strings get default Text/Emphasis/Markdown treatment; ReactNodes render as-is. */
function PageSubtitle({ children, ...rest }: { readonly children: ReactNode }) {
  const dataAttrs = filterDataAttributes(rest);

  if (typeof children === "string") {
    return (
      <div className={styles.subtitle} {...dataAttrs}>
        <Text size="large" variation="subdued">
          <Emphasis variation="bold">
            <Markdown content={children} basicUsage={true} />
          </Emphasis>
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.subtitle} {...dataAttrs}>
      {children}
    </div>
  );
}

/** Introduction text between the header and body. Strings get Text/Markdown treatment; ReactNodes render as-is. */
function PageIntro({
  children,
  externalLinks = false,
}: {
  readonly children: ReactNode;
  readonly externalLinks?: boolean;
}) {
  if (typeof children === "string") {
    return (
      <Text size="large">
        <Markdown
          content={children}
          basicUsage={true}
          externalLink={externalLinks}
        />
      </Text>
    );
  }

  return <>{children}</>;
}

/** Container for action buttons and menu. Applies responsive actionGroup layout. */
function PageActions({ children, ...rest }: { readonly children: ReactNode }) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <div className={styles.actionGroup} {...dataAttrs}>
      {children}
    </div>
  );
}

/** Primary action button. Pass `label`/`onClick` for defaults, or `children` for a custom element. */
function PagePrimaryAction({
  children,
  ref,
  label,
  onClick,
  icon,
  disabled,
  loading,
  ariaLabel,
  ...rest
}: {
  readonly children?: ReactNode;
  readonly ref?: RefObject<HTMLDivElement | null>;
  readonly label?: string;
  readonly onClick?: () => void;
  readonly icon?: ButtonProps["icon"];
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly ariaLabel?: string;
}) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <div className={styles.primaryAction} ref={ref} {...dataAttrs}>
      {children ?? (
        <Button
          label={label ?? ""}
          onClick={onClick}
          icon={icon}
          disabled={disabled}
          loading={loading}
          ariaLabel={ariaLabel}
          fullWidth={true}
        />
      )}
    </div>
  );
}

/** Secondary action button. Pass `label`/`onClick` for defaults, or `children` for a custom element. */
function PageSecondaryAction({
  children,
  ref,
  label,
  onClick,
  icon,
  disabled,
  loading,
  ariaLabel,
  ...rest
}: {
  readonly children?: ReactNode;
  readonly ref?: RefObject<HTMLDivElement | null>;
  readonly label?: string;
  readonly onClick?: () => void;
  readonly icon?: ButtonProps["icon"];
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly ariaLabel?: string;
}) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <div className={styles.actionButton} ref={ref} {...dataAttrs}>
      {children ?? (
        <Button
          label={label ?? ""}
          onClick={onClick}
          icon={icon}
          disabled={disabled}
          loading={loading}
          ariaLabel={ariaLabel}
          fullWidth={true}
          type="secondary"
        />
      )}
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
}: {
  readonly children: ReactNode;
  readonly triggerLabel?: string;
}) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <div className={styles.actionButton} {...dataAttrs}>
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
function PageBody({ children }: { readonly children: ReactNode }) {
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
Page.Subtitle = PageSubtitle;
Page.Intro = PageIntro;
Page.Actions = PageActions;
Page.PrimaryAction = PagePrimaryAction;
Page.SecondaryAction = PageSecondaryAction;
Page.Menu = PageMenu;
Page.Body = PageBody;
