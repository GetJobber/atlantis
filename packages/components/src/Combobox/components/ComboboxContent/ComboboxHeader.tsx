import React from "react";
import { Typography } from "@jobber/components/Typography";
import { Button } from "@jobber/components/Button";
import styles from "./ComboboxHeader.css";

interface ComboboxHeaderProps {
  subjectNoun?: string;
  selectedCount: number;
}

export function ComboboxHeader(props: ComboboxHeaderProps): JSX.Element {
  const { subjectNoun, selectedCount } = props;

  const label = subjectNoun ? `Select ${subjectNoun}` : "Select";
  const actionText = selectedCount > 0 ? "Clear" : "Select all";

  return (
    <div className={styles.header}>
      <Typography textColor="heading" fontWeight="semiBold">
        {selectedCount === 1 ? `${selectedCount} selected` : label}
      </Typography>
      <Button size="small" label={actionText} type="tertiary" />
    </div>
  );
}
