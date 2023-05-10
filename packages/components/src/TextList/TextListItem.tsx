import React, { ReactNode, isValidElement } from "react";
import styles from "./TextList.css";
import { Text } from "../Text";

interface TextListItemProps {
  readonly children: ReactNode;
}

export function TextListItem({ children }: TextListItemProps) {
  let item = <Text>{children}</Text>;

  if (isValidElement(children)) {
    item = children;
  }

  return <li className={styles.textListItem}>{item}</li>;
}
