import React from "react";
import classnames from "classnames";
import styles from "./Chip.css";
import { ChipProps } from "./ChipProps";
import { Avatar } from "./Avatar";
import { DismissAction } from "./DismissAction";
import { Icon } from "./Icon";
import { Text } from "../Text";

export function Chip(props: ChipProps) {
  const { onClick, label, selected = false, disabled = false } = props;
  const isButton = onClick != undefined && !disabled && !selected;
  const chipClassNames = classnames(styles.chip, {
    [styles.selected]: selected,
    [styles.button]: isButton,
    [styles.disabled]: disabled,
  });
  const Wrapper = isButton ? "span" : "span";
  return (
    <Wrapper
      className={chipClassNames}
      onClick={handleOnClick}
      {...(isButton && { "aria-label": label, onClick: handleOnClick })}
    >
      <InternalChip {...props} />
    </Wrapper>
  );

  function handleOnClick(event: React.MouseEvent<HTMLElement>) {
    isButton && onClick && onClick(event);
  }
}

function InternalChip({
  label,
  avatar,
  dismissAction,
  disabled,
  icon,
}: ChipProps) {
  return (
    <>
      {icon && <Icon name={icon} />}
      {avatar && <Avatar {...avatar} size="small" />}
      <Text>{label}</Text>
      {dismissAction && !disabled && <DismissAction {...dismissAction} />}
    </>
  );
}
