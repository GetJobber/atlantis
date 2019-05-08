import React from "react";
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
    <dl>
      {data.map(([term, description]) => (
        <div key={term} className={styles.termGroup}>
          <dd>{term}</dd>
          <dt>{description}</dt>
        </div>
      ))}
    </dl>
  );
}
