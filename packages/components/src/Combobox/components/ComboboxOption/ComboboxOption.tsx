import React, { useContext } from "react";
import classnames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { Flex } from "@jobber/components/Flex";
import styles from "./ComboboxOption.css";
import { ComboboxContext } from "../../ComboboxProvider";

export interface ComboboxOptionProps {
  readonly id: string | number;
  readonly label: string;
  readonly prefix?: React.ReactNode;
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
      <Flex template={props.prefix ? ["shrink", "grow"] : ["grow"]}>
        {props.prefix}

        {props.label}
      </Flex>

      <div>
        {isSelected && <Icon name="checkmark" color="interactiveSubtle" />}
      </div>
    </li>
  );
}
