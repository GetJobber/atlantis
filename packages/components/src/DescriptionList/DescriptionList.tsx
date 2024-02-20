import React, { ReactNode } from "react";
import styles from "./DescriptionList.css";
import { Typography } from "../Typography";

interface DescriptionListProps {
  /**
   * A tuple where the first item is the string to display as the term,
   * the second value is the string to display as the definition,
   * and the third value is an optional key to use as the React key in scenarios where the display value is not unique for all elements in the data set.
   */
  readonly data: [string, string | ReactNode, string?][];
}

export function DescriptionList({ data }: DescriptionListProps) {
  return (
    <dl className={styles.descriptionList}>
      {data.map(([term, description, key]) => (
        <div key={key || term} className={styles.termGroup}>
          <Typography element="dt" textColor="heading" size="base">
            {term}
          </Typography>

          <Typography element="dd" textColor="text" size="base">
            {description}
          </Typography>
        </div>
      ))}
    </dl>
  );
}
