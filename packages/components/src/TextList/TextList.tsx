import React, { Children, ReactElement } from "react";
import classNames from "classnames";
import { TextListItem } from "./TextListItem";
import styles from "./TextList.css";

interface TextListProps {
  readonly data: Array<string | ReactElement>;
  readonly type?: "bullets" | "numbers";
}

export function TextList({ data, type = "bullets" }: TextListProps) {
  const isBulleted = type === "bullets";
  const Tag = isBulleted ? "ul" : "ol";
  const tagClassNames = classNames(styles.textList, {
    [styles.numbered]: !isBulleted,
  });

  return (
    <Tag className={tagClassNames}>
      {Children.map(data, listItem => (
        <TextListItem>{listItem}</TextListItem>
      ))}
    </Tag>
  );
}
