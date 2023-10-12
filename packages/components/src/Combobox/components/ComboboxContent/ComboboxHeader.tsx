import React from "react";
import { Typography } from "@jobber/components/Typography";
import { Button } from "@jobber/components/Button";
import styles from "./ComboboxHeader.css";

interface ComboboxHeaderProps {
  readonly subjectNoun?: string;
  readonly selectedCount: number;
  readonly onClearAll: () => void;
  readonly onSelectAll: () => void;
}

export function ComboboxHeader(props: ComboboxHeaderProps): JSX.Element {
  const hasSelected = props.selectedCount > 0;
  let label = "Select";
  let actionLabel = "Select all";

  if (props.subjectNoun) {
    label = `Select ${props.subjectNoun}`;
  }

  if (hasSelected) {
    label = `${props.selectedCount} selected`;
    actionLabel = "Clear";
  }

  const handleSelectAll = () => {
    if (hasSelected) {
      props.onClearAll();
    } else {
      props.onSelectAll();
    }
  };

  return (
    <div className={styles.header} data-testid="ATL-Combobox-Header">
      <Typography textColor="heading" fontWeight="semiBold">
        {label}
      </Typography>
      <Button
        size="small"
        label={actionLabel}
        type="tertiary"
        onClick={handleSelectAll}
      />
    </div>
  );
}
