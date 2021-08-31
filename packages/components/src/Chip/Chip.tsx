import React from "react";
import styles from "./Chip.css";
import { Avatar, AvatarProps } from "../Avatar";
import { Text } from "../Text";
import { ButtonDismiss } from "../ButtonDismiss";

interface DismissibleAction {
  ariaLabel: string;
  onDismiss(): void;
}

interface ChipProps {
  label: string;
  avatar?: Exclude<AvatarProps, "size">;
  dismissAction: DismissibleAction;
}

export function Chip({
  label,
  avatar,
  dismissAction: { ariaLabel, onDismiss },
}: ChipProps) {
  return (
    <span className={styles.chip}>
      <div>{avatar && <Avatar {...avatar} size="small" />}</div>
      <Text>{label}</Text>
      <ButtonDismiss ariaLabel={ariaLabel} onClick={onDismiss} size="small" />
    </span>
  );
}
