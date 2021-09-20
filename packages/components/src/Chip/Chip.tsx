import React from "react";
import classnames from "classnames";
import styles from "./Chip.css";
import { ChipProps } from "./ChipProps";
import { Avatar } from "./Avatar";
import { DismissAction } from "./DismissAction";
import { Icon } from "../Icon";
import { Text } from "../Text";

export function Chip(props: ChipProps) {
  const { onClick, label, selected = false, disabled = false } = props;
  const isButton = onClick != undefined && !disabled && !selected;
  const chipClassNames = classnames(styles.chip, {
    [styles.selected]: selected,
    [styles.disabled]: disabled,
  });

  return (
    <button
      className={chipClassNames}
      onClick={handleOnClick}
      aria-label={label}
    >
      <InternalChip {...props} />
    </button>
  );

  function handleOnClick(event: React.MouseEvent<HTMLElement>) {
    isButton && onClick && onClick(event);
  }
}

function InternalChip({
  label,
  selected,
  avatar,
  dismissAction,
  disabled,
  icon,
}: ChipProps) {
  return (
    <>
      {avatar && <Avatar {...avatar} size="small" />}
      {icon && <Icon name={icon} {...(selected && { color: "white" })} />}
      <Text variation="subdued">{label}</Text>
      {selected && <Icon name="checkmark" color="white" />}
      {dismissAction && !disabled && <DismissAction {...dismissAction} />}
    </>
  );
}
