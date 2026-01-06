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
  const { pageStyles, showActionGroup, showMenu } = usePage({
    width,
    moreActionsMenu,
    primaryAction,
    secondaryAction,
  });

  return (
    <PageWrapper pageStyles={pageStyles}>
      <PageHeader>
        <PageTitleBar>
          <PageTitleMeta
            title={title}
            titleMetaData={titleMetaData}
            subtitle={subtitle}
          />
          <PageActionGroup visible={!!showActionGroup}>
            <PagePrimaryAction
              ref={primaryAction?.ref}
              visible={!!primaryAction}
            >
              <Button {...getActionProps(primaryAction)} />
            </PagePrimaryAction>
            <PageActionButton
              ref={secondaryAction?.ref}
              visible={!!secondaryAction}
            >
              <Button {...getActionProps(secondaryAction)} />
            </PageActionButton>
            <PageActionButton visible={!!showMenu}>
              <Menu items={moreActionsMenu}></Menu>
            </PageActionButton>
          </PageActionGroup>
        </PageTitleBar>
        <PageIntro externalIntroLinks={externalIntroLinks}>{intro}</PageIntro>
      </PageHeader>
      <Content>{children}</Content>
    </PageWrapper>
  );
}

function PageWrapper({
  children,
  pageStyles,
}: {
  readonly children: ReactNode;
  readonly pageStyles: string;
}) {
  return (
    <div className={pageStyles}>
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

function PageTitleBar({ children }: { readonly children: ReactNode }) {
  return (
    <Container name="page-titlebar" autoWidth>
      <Container.Apply autoWidth>{children}</Container.Apply>
    </Container>
  );
}

function PageActionButton({
  children,
  ref,
  visible,
}: {
  readonly children: ReactNode;
  readonly ref?: RefObject<HTMLDivElement | null>;
  readonly visible: boolean;
}) {
  return visible ? (
    <div className={styles.actionButton} ref={ref}>
      {children}
    </div>
  ) : null;
}

function PagePrimaryAction({
  children,
  ref,
  visible,
}: {
  readonly children: ReactNode;
  readonly ref?: RefObject<HTMLDivElement | null>;
  readonly visible: boolean;
}) {
  return visible ? (
    <div className={styles.primaryAction} ref={ref}>
      {children}
    </div>
  ) : null;
}

function PageActionGroup({
  children,
  visible,
}: {
  readonly children: ReactNode;
  readonly visible: boolean;
}) {
  return visible ? <div className={styles.actionGroup}>{children}</div> : null;
}

function PageTitleMeta({
  title,
  titleMetaData,
  subtitle,
}: {
  readonly title: ReactNode;
  readonly titleMetaData: ReactNode;
  readonly subtitle?: string;
}) {
  return (
    <div>
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
    </div>
  );
}

function PageTitleRow({ children }: { readonly children: ReactNode }) {
  return <div className={styles.titleRow}>{children}</div>;
}

function PageSubtitle({ children }: { readonly children?: string }) {
  return (
    children && (
      <div className={styles.subtitle}>
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

  if (primaryAction != undefined) {
    primaryAction = Object.assign({ fullWidth: true }, primaryAction);
  }

  if (secondaryAction != undefined) {
    secondaryAction = Object.assign(
      { type: "secondary", fullWidth: true },
      secondaryAction,
    );
  }

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
