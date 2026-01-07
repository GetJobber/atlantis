import type { ReactNode, RefObject } from "react";
import React from "react";
import classnames from "classnames";
import styles from "./Page.module.css";
import type { ButtonActionProps, PageProps } from "./types";
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
  ...rest
}: PageProps) {
  const dataAttrs = filterDataAttributes(rest);
  const { pageStyles, showActionGroup, showMenu } = usePage({
    width,
    moreActionsMenu,
    primaryAction,
    secondaryAction,
  });

  return (
    <Page.Wrapper pageStyles={pageStyles} {...dataAttrs}>
      <Page.Header>
        <Page.TitleBar>
          <Page.TitleMeta
            title={title}
            titleMetaData={titleMetaData}
            subtitle={subtitle}
          />
          <Page.ActionGroup visible={!!showActionGroup}>
            <Page.PrimaryAction
              ref={primaryAction?.ref}
              visible={!!primaryAction}
            >
              <Button {...getActionProps(primaryAction)} fullWidth />
            </Page.PrimaryAction>
            <Page.ActionButton
              ref={secondaryAction?.ref}
              visible={!!secondaryAction}
            >
              <Button
                {...getActionProps(secondaryAction)}
                fullWidth
                type="secondary"
              />
            </Page.ActionButton>
            <Page.ActionButton visible={!!showMenu}>
              <Menu items={moreActionsMenu}></Menu>
            </Page.ActionButton>
          </Page.ActionGroup>
        </Page.TitleBar>
        <PageIntro externalIntroLinks={externalIntroLinks}>{intro}</PageIntro>
      </Page.Header>
      <Content>{children}</Content>
    </Page.Wrapper>
  );
}

function PageWrapper({
  children,
  pageStyles,
  ...rest
}: {
  readonly children: ReactNode;
  readonly pageStyles: string;
}) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <div className={pageStyles} {...dataAttrs}>
      <Content>{children}</Content>
    </div>
  );
}

function PageIntro({
  children,
  externalIntroLinks,
}: {
  readonly children?: string;
  readonly externalIntroLinks?: boolean;
}) {
  return (
    children && (
      <Text size="large">
        <Markdown
          content={children}
          basicUsage={true}
          externalLink={externalIntroLinks}
        />
      </Text>
    )
  );
}

function PageHeader({ children }: { readonly children: ReactNode }) {
  return <Content>{children}</Content>;
}

function PageTitleBar({ children, ...rest }: { readonly children: ReactNode }) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <Container
      name="page-titlebar"
      autoWidth
      dataAttributes={dataAttrs as CommonAtlantisProps["dataAttributes"]}
    >
      <Container.Apply autoWidth>
        <div className={styles.titleBar}>{children}</div>
      </Container.Apply>
    </Container>
  );
}

function PageActionButton({
  children,
  ref,
  visible,
  ...rest
}: {
  readonly children: ReactNode;
  readonly ref?: RefObject<HTMLDivElement | null>;
  readonly visible: boolean;
}) {
  const dataAttrs = filterDataAttributes(rest);

  return visible ? (
    <div className={styles.actionButton} ref={ref} {...dataAttrs}>
      {children}
    </div>
  ) : null;
}

function PagePrimaryAction({
  children,
  ref,
  visible,
  ...rest
}: {
  readonly children: ReactNode;
  readonly ref?: RefObject<HTMLDivElement | null>;
  readonly visible: boolean;
}) {
  const dataAttrs = filterDataAttributes(rest);

  return visible ? (
    <div className={styles.primaryAction} ref={ref} {...dataAttrs}>
      {children}
    </div>
  ) : null;
}

function PageActionGroup({
  children,
  visible,
  ...rest
}: {
  readonly children: ReactNode;
  readonly visible: boolean;
}) {
  const dataAttrs = filterDataAttributes(rest);

  return visible ? (
    <div className={styles.actionGroup} {...dataAttrs}>
      {children}
    </div>
  ) : null;
}

function PageTitleMeta({
  title,
  titleMetaData,
  subtitle,
  elem,
  ...rest
}: {
  readonly title: ReactNode;
  readonly titleMetaData: ReactNode;
  readonly subtitle?: string;
  readonly elem?: React.ElementType;
}) {
  const dataAttrs = filterDataAttributes(rest);
  const Tag = elem ?? "div";

  return (
    <Tag {...dataAttrs}>
      {typeof title === "string" && titleMetaData ? (
        <PageTitleRow>
          <Heading level={1}>{title}</Heading>
          {titleMetaData}
        </PageTitleRow>
      ) : typeof title === "string" ? (
        <Heading level={1}>{title}</Heading>
      ) : (
        title
      )}
      <PageSubtitle>{subtitle}</PageSubtitle>
    </Tag>
  );
}

function PageTitleRow({ children, ...rest }: { readonly children: ReactNode }) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    <div className={styles.titleRow} {...dataAttrs}>
      {children}
    </div>
  );
}

function PageSubtitle({ children, ...rest }: { readonly children?: string }) {
  const dataAttrs = filterDataAttributes(rest);

  return (
    children && (
      <div className={styles.subtitle} {...dataAttrs}>
        <Text size="large" variation="subdued">
          <Emphasis variation="bold">
            <Markdown content={children} basicUsage={true} />
          </Emphasis>
        </Text>
      </div>
    )
  );
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

function usePage({
  width,
  moreActionsMenu,
  primaryAction,
  secondaryAction,
}: Pick<
  PageProps,
  "width" | "moreActionsMenu" | "primaryAction" | "secondaryAction"
>) {
  const pageStyles = classnames(styles.page, styles[width ?? "standard"]);

  const showMenu = moreActionsMenu?.length ?? 0 > 0;
  const showActionGroup = showMenu || primaryAction || secondaryAction;

  return { pageStyles, showActionGroup, showMenu };
}

Page.ActionButton = PageActionButton;
Page.PrimaryAction = PagePrimaryAction;
Page.ActionGroup = PageActionGroup;
Page.TitleMeta = PageTitleMeta;
Page.TitleRow = PageTitleRow;
Page.Subtitle = PageSubtitle;
Page.Intro = PageIntro;
Page.Header = PageHeader;
Page.TitleBar = PageTitleBar;
Page.Wrapper = PageWrapper;
