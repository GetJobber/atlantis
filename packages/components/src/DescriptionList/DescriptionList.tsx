import React from "react";
import { Typography } from "../Typography";
import styles from "./DescriptionList.css";

interface DescriptionListProps {
  /**
   * A tuple where the first item is the string to display as the term
   * and the second value is the string to display as the definition
   */
  data: [string, string][];
}

export function DescriptionList({ data }: DescriptionListProps) {
  return (
    <dl className={styles.descriptionList}>
      {data.map(([term, description]) => (
        <div key={term} className={styles.termGroup}>
          <Typography element="dd" textColor="blue" size="base">
            {term}
          </Typography>

          <Typography element="dt" textColor="greyBlue" size="base">
            {description}
          </Typography>
        </div>
      ))}
    </dl>
  );
}
