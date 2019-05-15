import React, { ReactNode, ReactElement, FunctionComponent } from "react";
import classnames from "classnames";
import styles from "./Document.css";

interface DocumentSectionProps {
  readonly children: ReactNode;
}

export function Header({ children }: DocumentSectionProps) {
  return <header className={styles.header}>{children}</header>;
}

export function Title({ children }: DocumentSectionProps) {
  return <div className={styles.title}>{children}</div>;
}

export function ContactInfo({ children }: DocumentSectionProps) {
  return <div className={styles.contactInfo}>{children}</div>;
}

export function Detail({ children }: DocumentSectionProps) {
  return <div className={styles.detail}>{children}</div>;
}

export function Content({ children }: DocumentSectionProps) {
  return <div className={styles.content}>{children}</div>;
}

interface DocumentProps {
  readonly accentColor?: "purple";
  readonly children: ReactElement<DocumentSectionProps, FunctionComponent>[];
}

export function Document({ accentColor, children }: DocumentProps) {
  const className = classnames(
    styles.document,
    accentColor && styles[accentColor],
  );

  const childrenArray = React.Children.toArray(children);
  function getComponent(component: Function) {
    return childrenArray.filter(
      child => child.type.displayName === component.name,
    );
  }

  return (
    <div className={className}>
      {getComponent(Header)}
      <div className={styles.flexColumn}>
        {getComponent(Title)}
        {getComponent(ContactInfo)}
      </div>
      {getComponent(Detail)}
      {getComponent(Content)}
    </div>
  );
}
