import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./Document.css";

interface DocumentProps {
  readonly accentColor?: "purple";
  readonly children: ReactNode;
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

export function Header({ children }: HeaderProps) {
  return <header className={styles.header}>{children}</header>;
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
