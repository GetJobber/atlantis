import React from "react";
import { Typography } from "@jobber/components/Typography";
import { Button } from "@jobber/components/Button";
import { ComboboxHeaderProps } from "@jobber/components/Combobox/Combobox.types";
import styles from "./ComboboxContentHeader.css";

export function ComboboxContentHeader(props: ComboboxHeaderProps): JSX.Element {
  const hasSelected = props.selectedCount > 0;
  const actionLabel = hasSelected ? "Clear" : "Select all";
  const label = getLabel(hasSelected, props.selectedCount, props.subjectNoun);
  const handleSelectAll = hasSelected ? props.onClearAll : props.onSelectAll;

  const searchTermMatches = props.options.some(option =>
    option.label.toLowerCase().includes(props.searchValue.toLowerCase()),
  );

  const showClearButton = hasSelected || searchTermMatches;

  return (
    <div className={styles.header} data-testid="ATL-Combobox-Header">
      <Typography textColor="heading" fontWeight="semiBold">
        {label}
      </Typography>
      {showClearButton && (
        <Button
          size="small"
          label={actionLabel}
          type="tertiary"
          onClick={handleSelectAll}
        />
      )}
    </div>
  );
}

function getLabel(
  hasSelected: boolean,
  count: number,
  subjectNoun?: string,
): string {
  if (hasSelected) {
    return `${count} selected`;
  }

  if (subjectNoun) {
    return `Select ${subjectNoun}`;
  }

  return "Select";
}
