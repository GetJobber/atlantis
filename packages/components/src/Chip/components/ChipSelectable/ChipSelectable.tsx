import React from "react";
import { Icon } from "@jobber/components/Icon";
import { Chip } from "../../Chip";
import type { ChipSelectableProps } from "../../Chip.types";
import styles from "../../Chip.module.css";

export function ChipSelectable({ selected, ...rest }: ChipSelectableProps) {
  return (
    <Chip {...rest}>
      <Chip.Suffix className={selected ? styles.selected : ""}>
        <Icon
          name={selected ? "checkmark" : "add"}
          size="small"
          color="interactiveSubtle"
        />
      </Chip.Suffix>
    </Chip>
  );
}
