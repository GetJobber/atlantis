import React, { useContext } from "react";
import classnames from "classnames";
import { Icon } from "@jobber/components/Icon";
import styles from "./ComboboxOption.css";
import { ComboboxContext } from "../../ComboboxProvider";

export interface ComboboxOptionProps {
  readonly id: string | number;
  readonly label: string;
}

export function ComboboxOption(props: ComboboxOptionProps) {
  const { selected, selectionHandler } = useContext(ComboboxContext);

  const isSelected = selected.some(
    selection => selection.id.toString() === props.id.toString(),
  );

  return (
    <li
      key={props.id}
      tabIndex={-1}
      data-selected={isSelected}
      role="option"
      aria-selected={isSelected}
      onClick={() =>
        selectionHandler &&
        selectionHandler({ id: props.id, label: props.label })
      }
      className={classnames(styles.option)}
    >
      {props.label}
      {isSelected && <Icon name="checkmark" color="blue" />}
    </li>
  );
}
