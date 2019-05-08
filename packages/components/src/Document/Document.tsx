import React, { ReactNode } from "react";
import classnames from "classnames";
import { Icon, IconName } from "../Icon";
import { InlineLabel } from "../InlineLabel";
import styles from "./Document.css";

interface DocumentProps {
  readonly accentColor?: "purple";
  readonly children: ReactNode;
}

interface StatusLabelProps {
  readonly status: "draft" | "pending" | "paid";
}

interface HeaderProps {
  readonly children: ReactNode;
}

interface TitleProps {
  readonly children: ReactNode;
}

interface DetailProps {
  readonly children: ReactNode;
}

interface ContentProps {
  readonly children: ReactNode;
}

function getStatusLabelColour(status: string) {
  switch (status) {
    case "pending":
      return "yellow";
    case "paid":
      return "green";
    default:
      return "greyBlue";
  }
}

export function Header({ children }: HeaderProps) {
  return <header className={styles.header}>{children}</header>;
}

export function StatusLabel({ status }: StatusLabelProps) {
  const statusColour = getStatusLabelColour(status);

  return (
    <span className={styles.statusWrapper}>
      <InlineLabel color={statusColour}>{status}</InlineLabel>
    </span>
  );
}

export function DecoratedIcon({ iconName }: { iconName: IconName }) {
  return (
    <span className={styles.iconDecorator}>
      <Icon iconName={iconName} />
    </span>
  );
}

export function Title({ children }: TitleProps) {
  return <div className={styles.title}>{children}</div>;
}

export function Detail({ children }: DetailProps) {
  return <div className={styles.detail}>{children}</div>;
}

export function Content({ children }: ContentProps) {
  return <div className={styles.content}>{children}</div>;
}

export function Document({ accentColor, children }: DocumentProps) {
  const className = classnames(
    styles.document,
    accentColor && styles[accentColor],
  );

  return <div className={className}>{children}</div>;
}
