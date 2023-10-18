import React from "react";
import { Icon } from "@jobber/components/Icon";
import { Chip } from "../../Chip";
import { ChipSelectableProps } from "../../Chip.types.d";
import styles from "../../Chip.css";

export function ChipSelectable({ selected, ...rest }: ChipSelectableProps) {
  return (
    <Chip {...rest}>
      <Chip.Suffix className={selected ? styles.selected : ""} showBG={true}>
        <Icon
          name={selected ? "checkmark" : "add"}
          size="small"
          color={selected ? "green" : "blue"}
        />
      </Chip.Suffix>
    </Chip>
  );
}
