import React, { ReactElement } from "react";
import classNames from "classnames";
import { TextListItem } from "./TextListItem";
import styles from "./TextList.css";

interface TextListProps {
  /**
   * Array of string, elements, or a tuple of `[string, <TextList />]` that
   * creates the list.
   *
   * The tuple type allows you to nest the list and keeps the option of it being
   * open to a nested number or bullet list.
   */
  readonly data: Array<
    string | ReactElement | [string, ReactElement<TextListProps>]
  >;

  /**
   * Changes the list from bullet to numbers. Semantically, this also changes
   * the tag from UL to OL.
   *
   * @default "bullets"
   */
  readonly type?: "bullets" | "numbers";
}

export function TextList({ data, type = "bullets" }: TextListProps) {
  const isBulleted = type === "bullets";
  const Tag = isBulleted ? "ul" : "ol";
  const tagClassNames = classNames(styles.textList, {
    [styles.bulleted]: isBulleted,
    [styles.numbered]: type === "numbers",
  });

  return (
    <Tag className={tagClassNames}>
      {data.map((listItem, i) => {
        return <TextListItem key={i}>{listItem}</TextListItem>;
      })}
    </Tag>
  );
}
