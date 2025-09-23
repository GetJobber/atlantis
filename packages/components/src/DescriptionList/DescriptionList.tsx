import type { ReactNode } from "react";
import React from "react";
import styles from "./DescriptionList.module.css";
import { Typography } from "../Typography";

interface DescriptionListProps {
  /**
   * A tuple where the first item is the string to display as the term
   * and the second value is the string to display as the definition
   */
  readonly data: [string, string | ReactNode][];
}

export function DescriptionList({ data }: DescriptionListProps) {
  return (
    <dl className={styles.descriptionList}>
      {data.map(([term, description], i) => (
        <div key={`${term}-${i}`} className={styles.termGroup}>
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
