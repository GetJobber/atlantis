import React from "react";
import styles from "./DescriptionList.css";

export function DescriptionList({
  data,
}: {
  data: { [term: string]: string };
}) {
  return (
    <dl>
      {Object.entries(data).map(([term, description]) => (
        <div key={term} className={styles.metadataGroup}>
          <dd>{term}</dd>
          <dt>{description}</dt>
        </div>
      ))}
    </dl>
  );
}
