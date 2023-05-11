import React, { Fragment, ReactNode, isValidElement } from "react";
import styles from "./TextList.css";
import { Text } from "../Text";

interface TextListItemProps {
  readonly children: ReactNode;
}

export function TextListItem({ children }: TextListItemProps) {
  return <li className={styles.textListItem}>{getChild(children)}</li>;
}

function getChild(children: ReactNode): JSX.Element {
  if (Array.isArray(children)) {
    const nestedChildren = children.map((child: ReactNode, i) => (
      <Fragment key={i}>{getChild(child)}</Fragment>
    ));
    return <>{nestedChildren}</>;
  }

  if (isValidElement(children)) {
    return children;
  }

  return <Text>{children}</Text>;
}
