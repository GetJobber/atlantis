import React from "react";
import { Typography } from "@jobber/components/Typography";
import { Button } from "@jobber/components/Button";
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
      <Button size="small" label="Select all" type="tertiary" />
    </div>
  );
}

// when multiselect is true, the header should be present
//  the label should:
//  read "Select" || "Select {subjectNoun}" when no options are selected
//  read "{count} selected" when one or more options is selected

// the action should:
// read "Select all" when no options are selected
// read "Clear" when one or more options is selected

// when multiselect is false, the header should not exist
