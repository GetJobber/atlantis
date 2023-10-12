import React, { useEffect, useState } from "react";
import { Chip } from "../../Chip";
import { ChipSelectableProps } from "../../Chip.types";
import styles from "../../Chip.css";
import { Icon } from "../../../Icon";

export function ChipSelectable({
  ariaLabel,
  disabled,
  heading,
  invalid,
  label,
  selected,
  role,
  tabIndex,
  value,
  variation,
  onClick,
  onKeyDown,
}: ChipSelectableProps) {
  const [isChipSelected, setIsChipSelected] = useState(selected);

  useEffect(() => {
    setIsChipSelected(selected);
  }, [selected]);

  const toggleSelected = () =>
    setIsChipSelected(oldSelectedVal => !oldSelectedVal);

  const innerClick = (
    inVal: string | number | undefined,
    ev: React.MouseEvent<HTMLButtonElement>,
  ) => {
    toggleSelected();

    if (onClick) {
      onClick(inVal, ev);
    }
  };

  return (
    <Chip
      ariaLabel={ariaLabel}
      disabled={disabled}
      heading={heading}
      invalid={invalid}
      label={label}
      role={role}
      tabIndex={tabIndex}
      variation={variation}
      value={value}
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
