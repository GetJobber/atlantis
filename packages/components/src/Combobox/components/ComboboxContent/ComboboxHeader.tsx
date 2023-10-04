import React from "react";
import { Typography } from "@jobber/components/Typography";
import styles from "./ComboboxHeader.css";

// interface ComboboxHeaderProps {
//   label: string;
//   action: "Clear";
// }

export function ComboboxHeader(): JSX.Element {
  return (
    <div className={styles.header}>
      <Typography textColor="heading" fontWeight="semiBold">
        Select
      </Typography>
      <button className={styles.action}>
        <Typography size="base" textColor="green" fontWeight="semiBold">
          Clear
        </Typography>
      </button>
    </div>
  );
}

// when multiselect is enabled, the header should show the number of selected item and a "Clear" button
// when multiselect is disabled, the header should not exist
