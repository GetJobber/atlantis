import React, { Children, ReactElement } from "react";
import { TextListItem } from "./TextListItem";

interface TextListProps {
  readonly data: Array<string | ReactElement>;
  readonly type?: "bullets" | "numbers";
}

export function TextList({ data, type = "bullets" }: TextListProps) {
  const Tag = type === "bullets" ? "ul" : "ol";

  return (
    <Tag>
      {Children.map(data, listItem => (
        <TextListItem>{listItem}</TextListItem>
      ))}
    </Tag>
  );
}
