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
  // Problem, we need all the first selected stuff, but we do not want that as a prop
  // since this is user facing
  // so what can we do instead?
  // Clone + internal version of component
  // or
  // Context where we interact with that higher level state

  // similar problem for the selection handler
  // we do not want to expose that, but we do need it
  return (
    <li
      ref={listItem => {
        // if (isSelected && !hasSeenFirstSelected) {
        //   props.setFirstSelectedElement(listItem);
        //   hasSeenFirstSelected = true;
        // }
      }}
      key={props.id}
      tabIndex={-1}
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
