import React, { useEffect, useState } from "react";
import { Chip } from "../../Chip";
import { ChipSelectableProps } from "../../Chip.types";
import styles from "../../Chip.css";
import { Icon } from "../../../Icon";

export function ChipSelectable({
  label,
  ariaLabel,
  selected,
  onClick,
  onKeyDown,
  value,
}: ChipSelectableProps) {
  const [isChipSelected, setIsChipSelected] = useState(selected);

  useEffect(() => {
    setIsChipSelected(selected);
  }, [selected]);

  const toggleSelected = () =>
    setIsChipSelected(oldSelectedVal => !oldSelectedVal);

  const innerClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    toggleSelected();
    if (onClick) {
      onClick(ev, value);
    }
  };

  return (
    <Chip
      label={label}
      ariaLabel={ariaLabel}
      onClick={innerClick}
      onKeyDown={onKeyDown}
    >
      <Chip.Suffix className={isChipSelected ? styles.selected : ""}>
        <Icon
          name={isChipSelected ? "checkmark" : "add"}
          size="small"
          color={isChipSelected ? "green" : "blue"}
        />
      </Chip.Suffix>
    </Chip>
  );
}
