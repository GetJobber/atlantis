import React, { ReactElement } from "react";
import classNames from "classnames";
import { TextListItem } from "./TextListItem";
import styles from "./TextList.css";

type Data = Array<string | ReactElement | Data>;

interface TextListProps {
  readonly data: Data;
  readonly type?: "bullets" | "numbers";
}

export function TextList({ data, type = "bullets" }: TextListProps) {
  const isBulleted = type === "bullets";
  const Tag = isBulleted ? "ul" : "ol";
  const tagClassNames = classNames(styles.textList, {
    [styles.bulleted]: isBulleted,
    [styles.numbered]: !isBulleted,
  });

  return (
    <Tag className={tagClassNames}>
      {data.map((listItem, i) => {
        return <TextListItem key={i}>{listItem}</TextListItem>;
      })}
    </Tag>
  );
}
