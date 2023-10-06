import React from "react";
import { Typography } from "@jobber/components/Typography";
import { Button } from "@jobber/components/Button";
import styles from "./ComboboxHeader.css";

interface ComboboxHeaderProps {
  subjectNoun?: string;
  selectedCount: number;
}

export function ComboboxHeader(props: ComboboxHeaderProps): JSX.Element {
  const label = props.subjectNoun ? `Select ${props.subjectNoun}` : "Select";
  const actionText = props.selectedCount > 0 ? "Clear" : "Select all";

  return (
    <div className={styles.header} data-testid="ATL-Combobox-Header">
      <Typography textColor="heading" fontWeight="semiBold">
        {props.selectedCount === 1 ? `${props.selectedCount} selected` : label}
      </Typography>
      <Button size="small" label={actionText} type="tertiary" />
    </div>
  );
}
