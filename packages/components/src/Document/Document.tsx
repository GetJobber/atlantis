import React, { ReactNode } from "react";
import classnames from "classnames";
import { Icon, IconName } from "../Icon";
import { InlineLabel } from "../InlineLabel";
import styles from "./Document.css";

interface DocumentProps {
  readonly accentColor?: "purple";
  readonly status?: "draft" | "pending" | "paid";
  readonly name?: string;
}

interface StatusLabelProps {
  readonly status: "draft" | "pending" | "paid";
}

interface DocumentHeaderProps {
  readonly status?: "draft" | "pending" | "paid";
  readonly name?: string;
  readonly children: ReactNode;
}

interface DocumentContentProps {
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

function StatusLabel({ status }: StatusLabelProps) {
  const statusColour = getStatusLabelColour(status);

  return (
    <span className={styles.statusWrapper}>
      <InlineLabel color={statusColour}>{status}</InlineLabel>
    </span>
  );
}

function DocumentHeader({ status, name, children }: DocumentHeaderProps) {
  return (
    <div className={styles.documentHeader}>
      <div className={styles.topHeader}>
        <span className={styles.iconDecorator}>
          <Icon iconName={IconName.invoice} />
        </span>
        {status && <StatusLabel status={status} />}
        <h3>{name}</h3>
      </div>

      {children}
    </div>
  );
}

function DocumentContent({ children }: DocumentContentProps) {
  return <div className={styles.documentContent}>{children}</div>;
}

export function Document({ accentColor, status, name }: DocumentProps) {
  const wrapperClassName = classnames(
    styles.document,
    accentColor && styles[accentColor],
  );

  return (
    <div className={wrapperClassName}>
      <DocumentHeader status={status} name={name}>
        <h2>This is the document header.</h2>
      </DocumentHeader>
      <DocumentContent>
        <p>This is the document content.</p>
      </DocumentContent>
    </div>
  );
}
