import React, { ReactNode } from "react";
import styles from "./DescriptionList.css";
import { Typography } from "../Typography";

interface DescriptionListProps {
  /**
   * A tuple where the first item is the string to display as the term
   * and the second value is the string to display as the definition
   */
  data: [string, string | ReactNode][];
}

export function DescriptionList({ data }: DescriptionListProps) {
  return (
    <dl className={styles.descriptionList}>
      {data.map(([term, description]) => (
        <div key={term} className={styles.termGroup}>
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
