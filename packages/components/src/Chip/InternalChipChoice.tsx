import React, { ReactElement } from "react";
import styles from "./InternalChipChoice.css";
import { InternalChip, InternalChipProps } from "./InternalChip";

interface ChipSelectionProps {
  readonly children: ReactElement<ChipProps>[];
  readonly selected: string;
  onChange(value: string): void;
}

export function InternalChipChoice({
  children,
  selected,
  onChange,
}: ChipSelectionProps) {
  return (
    <div className={styles.wrapper}>
      {React.Children.map(children, child => (
        <InternalChip
          {...child.props}
          active={child.props.value === selected}
          onClick={() => handleClick(child.props.value)}
        />
      ))}
    </div>
  );

  function handleClick(value: string) {
    const newValue = value !== selected ? value : "";
    onChange(newValue);
  }
}

interface ChipProps
  extends Pick<InternalChipProps, "label" | "prefix" | "disabled" | "invalid"> {
  readonly value: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Chip = (props: ChipProps) => <></>;
